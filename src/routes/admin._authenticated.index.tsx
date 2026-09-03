import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ShoppingCart,
  Package,
  AlertTriangle,
  TrendingUp,
  Clock,
  CheckCircle2,
  Truck,
  XCircle,
  ArrowRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAdminOrders, useAdminProducts, useStockBatch, useProductThumbnailsBatch } from "@/hooks/use-api";
import { getProductIdNumber, getProductStock, type Order } from "@/types";
import { resolveImageUrl, cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/_authenticated/")({
  head: () => ({
    meta: [{ title: "Dashboard — Admin" }],
  }),
  component: AdminDashboardPage,
});

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(amount);
}

function getStatusVariant(status: string): "pending" | "processing" | "shipped" | "delivered" | "cancelled" | "default" {
  const map: Record<string, "pending" | "processing" | "shipped" | "delivered" | "cancelled"> = {
    Pending: "pending",
    Processing: "processing",
    Shipped: "shipped",
    Delivered: "delivered",
    Cancelled: "cancelled",
  };
  return map[status] ?? "default";
}

// ─── Subcomponents ────────────────────────────────────────────────────────────

function MetricCard({
  label,
  value,
  sub,
  icon: Icon,
  accent,
}: {
  label: string;
  value: string | number;
  sub: string;
  icon: React.ElementType;
  accent?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-sm border p-6 transition-colors",
        accent ? "border-primary/30 bg-primary/5" : "border-border bg-card"
      )}
    >
      <div className="flex items-center justify-between">
        <p className="rule-label">{label}</p>
        <div
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-sm",
            accent ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"
          )}
        >
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <p className="mt-4 font-display text-3xl font-normal tracking-tight text-foreground">
        {value}
      </p>
      <p className="mt-2 text-xs text-muted-foreground">{sub}</p>
    </div>
  );
}

function OrderRow({ order }: { order: Order }) {
  const date = new Date(order.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return (
    <div className="flex items-center justify-between py-3 border-b border-border last:border-0">
      <div className="flex items-center gap-3 min-w-0">
        <div className="min-w-0">
          <p className="font-mono text-xs text-muted-foreground">#{order.id}</p>
          <p className="text-sm font-medium text-foreground truncate">
            {order.user ? `${order.user.firstName} ${order.user.lastName}` : "Customer"}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4 shrink-0">
        <span className="text-xs text-muted-foreground">{date}</span>
        <span className="font-mono text-sm font-medium text-foreground">
          {formatCurrency(order.totalAmount ?? 0)}
        </span>
        <Badge variant={getStatusVariant(order.status)} className="capitalize">
          {order.status}
        </Badge>
      </div>
    </div>
  );
}

// ─── Low-stock Row ────────────────────────────────────────────────────────────

function LowStockRow({
  item,
}: {
  item: {
    product: { id: string; name: string };
    stockQuantity: number;
    thumbnailUrl: string | null;
  };
}) {
  const imgUrl = item.thumbnailUrl ? resolveImageUrl(item.thumbnailUrl) : null;

  return (
    <div className="flex items-center gap-3 py-3 border-b border-border last:border-0">
      <div className="h-10 w-10 shrink-0 rounded-sm bg-surface overflow-hidden">
        {imgUrl ? (
          <img src={imgUrl} alt="" className="h-full w-full object-cover" />
        ) : (
          <div className="h-full w-full bg-muted" />
        )}
      </div>
      <p className="flex-1 min-w-0 text-sm text-foreground truncate">{item.product.name}</p>
      <Badge
        variant={item.stockQuantity === 0 ? "cancelled" : "pending"}
        className="shrink-0 tabular-nums"
      >
        {item.stockQuantity === 0 ? "Out of stock" : `${item.stockQuantity} left`}
      </Badge>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

function AdminDashboardPage() {
  const { data: ordersData, isLoading: ordersLoading } = useAdminOrders({ pageSize: 100 });
  const { data: productsData, isLoading: productsLoading } = useAdminProducts({ pageSize: 100 });

  const orders = ordersData?.data ?? [];
  const products = productsData?.data ?? [];
  const totalOrders = ordersData?.pagination?.totalItems ?? orders.length;
  const totalProducts = productsData?.pagination?.totalItems ?? products.length;

  // Fetch stock and thumbnails in batch from microservices
  const productIds = products.map((p) => getProductIdNumber(p));
  const { data: stockData, isLoading: stockLoading } = useStockBatch(productIds);
  const stockItems = stockData?.data ?? [];
  const { data: thumbnailsData } = useProductThumbnailsBatch(productIds);
  const thumbnails = thumbnailsData?.data ?? [];

  // Derived metrics
  const revenue = orders.reduce((sum, o) => sum + (o.totalAmount ?? 0), 0);
  const statusCounts = orders.reduce<Record<string, number>>((acc, o) => {
    acc[o.status] = (acc[o.status] ?? 0) + 1;
    return acc;
  }, {});
  const pendingCount = statusCounts["Pending"] ?? 0;

  // Low-stock: products with stock <= 5 from inventory service
  const lowStock = stockItems.length > 0
    ? [...products]
        .map((p) => {
          const pId = getProductIdNumber(p);
          const stockItem = stockItems.find(
            (i) => Number(i.product_id) === pId || Number((i as any).productId) === pId
          );
          return {
            product: p,
            stockQuantity: stockItem !== undefined ? stockItem.quantity : undefined,
            thumbnailUrl: thumbnails.find((t) => Number(t.productId) === pId)?.thumbnailUrl || null,
          };
        })
        .filter(
          (item): item is { product: (typeof products)[0]; stockQuantity: number; thumbnailUrl: string | null } =>
            item.stockQuantity !== undefined && item.stockQuantity <= 5
        )
        .sort((a, b) => a.stockQuantity - b.stockQuantity)
        .slice(0, 8)
    : [];

  // Recent orders: newest first
  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 8);

  const loading = ordersLoading || productsLoading;

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <h1 className="font-display text-3xl font-normal tracking-tight text-foreground">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Overview of your store's activity and inventory.
        </p>
      </div>

      {/* Metrics grid */}
      {loading ? (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-32 animate-pulse rounded-sm bg-muted" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <MetricCard
            label="Total Revenue"
            value={formatCurrency(revenue)}
            sub={`from ${totalOrders} order${totalOrders !== 1 ? "s" : ""}`}
            icon={TrendingUp}
            accent
          />
          <MetricCard
            label="Total Orders"
            value={totalOrders}
            sub={pendingCount > 0 ? `${pendingCount} pending action` : "All fulfilled"}
            icon={ShoppingCart}
          />
          <MetricCard
            label="Products"
            value={totalProducts}
            sub={lowStock.length > 0 ? `${lowStock.length} low stock` : "Stock healthy"}
            icon={Package}
          />
          <MetricCard
            label="Low / Out of Stock"
            value={lowStock.length}
            sub={lowStock.length > 0 ? "Needs attention" : "All stocked"}
            icon={AlertTriangle}
            accent={lowStock.length > 0}
          />
        </div>
      )}

      {/* Status breakdown */}
      {!loading && Object.keys(statusCounts).length > 0 && (
        <div className="rounded-sm border border-border bg-card p-6">
          <p className="rule-label mb-4">Orders by Status</p>
          <div className="flex flex-wrap gap-3">
            {Object.entries(statusCounts).map(([status, count]) => (
              <div key={status} className="flex items-center gap-2">
                <Badge variant={getStatusVariant(status)}>{status}</Badge>
                <span className="text-sm tabular-nums text-muted-foreground">{count}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Two-column detail panels */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent orders */}
        <div className="rounded-sm border border-border bg-card p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="rule-label">Recent Orders</p>
            <Button variant="ghost" size="sm" asChild className="gap-1 text-xs">
              <Link to="/admin/orders">
                All orders <ArrowRight className="h-3 w-3" />
              </Link>
            </Button>
          </div>
          {ordersLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-10 animate-pulse rounded-sm bg-muted" />
              ))}
            </div>
          ) : recentOrders.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">No orders yet.</p>
          ) : (
            <div>
              {recentOrders.map((order) => (
                <OrderRow key={order.id} order={order} />
              ))}
            </div>
          )}
        </div>

        {/* Low-stock products */}
        <div className="rounded-sm border border-border bg-card p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="rule-label">Low / Out of Stock</p>
            <Button variant="ghost" size="sm" asChild className="gap-1 text-xs">
              <Link to="/admin/products">
                All products <ArrowRight className="h-3 w-3" />
              </Link>
            </Button>
          </div>
          {productsLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-12 animate-pulse rounded-sm bg-muted" />
              ))}
            </div>
          ) : lowStock.length === 0 ? (
            <div className="flex flex-col items-center py-8 gap-2">
              <CheckCircle2 className="h-8 w-8 text-muted-foreground/40" />
              <p className="text-sm text-muted-foreground">All products are well stocked.</p>
            </div>
          ) : (
            <div>
              {lowStock.map((item) => (
                <LowStockRow key={item.product.id} item={item} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
