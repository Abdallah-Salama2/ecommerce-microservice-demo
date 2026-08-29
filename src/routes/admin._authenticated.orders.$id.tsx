import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, Package, User, MapPin, CreditCard, RefreshCw, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PriceTag } from "@/components/ui/price-tag";
import { useOrder, useUpdateOrderStatus } from "@/hooks/use-api";
import { getProductPrimaryImage } from "@/types";
import { resolveImageUrl } from "@/lib/utils";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/_authenticated/orders/$id")({
  component: AdminOrderWorkstationPage,
});

// --- Strict backend status values (exact capitalized strings) ---
type OrderStatus = "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";

const VALID_TRANSITIONS: Record<string, OrderStatus[]> = {
  Pending: ["Processing", "Cancelled"],
  Processing: ["Shipped", "Cancelled"],
  Shipped: ["Delivered"],
  Delivered: [],
  Cancelled: [],
};

const TERMINAL_STATES = new Set(["Delivered", "Cancelled"]);

/** Normalize whatever the backend sends ("PENDING", "pending", "Pending") → "Pending" */
function normalizeStatus(raw: string): OrderStatus {
  const s = raw.charAt(0).toUpperCase() + raw.slice(1).toLowerCase();
  if (s in VALID_TRANSITIONS) return s as OrderStatus;
  return raw as OrderStatus; // return as-is if unrecognized
}

const STATUS_BADGE_VARIANT: Record<string, string> = {
  Pending: "pending",
  Processing: "processing",
  Shipped: "shipped",
  Delivered: "delivered",
  Cancelled: "cancelled",
};

function StatusControl({
  currentStatus,
  orderId,
}: {
  currentStatus: OrderStatus;
  orderId: string;
}) {
  const updateStatusMutation = useUpdateOrderStatus();
  const nextOptions = VALID_TRANSITIONS[currentStatus] ?? [];
  const isTerminal = TERMINAL_STATES.has(currentStatus);

  const handleTransition = async (newStatus: OrderStatus) => {
    try {
      await updateStatusMutation.mutateAsync({ id: orderId, newStatus });
      toast.success(`Order status updated to ${newStatus}`);
    } catch (err: any) {
      const msg: string = err?.message ?? "";
      if (msg.includes("409") || msg.toLowerCase().includes("conflict")) {
        toast.error(
          "Status conflict — this order was already updated by another session. Refresh the page and retry."
        );
      } else {
        toast.error(msg || "Failed to update order status");
      }
    }
  };

  return (
    <Card className="border-primary/20 bg-card">
      <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            <RefreshCw className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">Fulfillment Status Control</p>
            {isTerminal ? (
              <p className="flex items-center gap-1 text-xs text-muted-foreground">
                <AlertCircle className="inline h-3 w-3 text-amber-500" />
                Terminal state — no further transitions are allowed.
              </p>
            ) : (
              <p className="text-xs text-muted-foreground">
                Advance the order through the fulfillment pipeline.
              </p>
            )}
          </div>
        </div>

        {isTerminal ? (
          <Badge
            variant={(STATUS_BADGE_VARIANT[currentStatus] ?? "default") as any}
            className="whitespace-nowrap self-start px-3 py-1.5 text-xs sm:self-auto"
          >
            {currentStatus} (Terminal)
          </Badge>
        ) : (
          <div className="flex flex-wrap items-center gap-2">
            {nextOptions.map((nextStatus) => (
              <Button
                key={nextStatus}
                size="sm"
                variant={nextStatus === "Cancelled" ? "destructive" : "default"}
                disabled={updateStatusMutation.isPending}
                onClick={() => handleTransition(nextStatus)}
                className="whitespace-nowrap gap-1.5"
              >
                {updateStatusMutation.isPending ? "Updating..." : `→ ${nextStatus}`}
              </Button>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function AdminOrderWorkstationPage() {
  const { id } = Route.useParams();
  const { data, isLoading, error, refetch } = useOrder(id);

  const order = data?.data;

  if (isLoading) {
    return <div className="p-12 text-center text-muted-foreground">Loading order workstation...</div>;
  }

  if (error || !order) {
    return (
      <div className="p-12 text-center space-y-4">
        <p className="text-destructive font-medium">Order #{id} not found or access denied.</p>
        <p className="text-xs text-muted-foreground max-w-sm mx-auto">
          If you are trying to view a customer order, ensure your admin session is active.
          The admin role is required to inspect orders that don't belong to your own account.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Button variant="outline" size="sm" onClick={() => refetch()}>
            Retry
          </Button>
          <Button asChild variant="ghost" size="sm">
            <Link to="/admin/orders">Back to Orders List</Link>
          </Button>
        </div>
      </div>
    );
  }

  const currentStatus = normalizeStatus(order.status || "Pending");
  const badgeVariant = STATUS_BADGE_VARIANT[currentStatus] ?? "default";

  const dateStr = new Date(order.createdAt).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <div className="space-y-8 p-6 lg:p-8">
      {/* Navigation Breadcrumb */}
      <div>
        <Button asChild variant="ghost" size="sm" className="gap-1 px-0 text-muted-foreground hover:text-foreground">
          <Link to="/admin/orders">
            <ChevronLeft className="h-4 w-4" />
            Back to Orders List
          </Link>
        </Button>
        <div className="mt-2 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="font-display text-2xl font-normal tracking-tight text-foreground sm:text-3xl">
              Order #{order.id} Workstation
            </h1>
            <p className="mt-1 text-xs text-muted-foreground">Placed on {dateStr}</p>
          </div>
          <Badge
            variant={badgeVariant as any}
            className="whitespace-nowrap text-sm px-3 py-1 self-start sm:self-auto"
          >
            {currentStatus}
          </Badge>
        </div>
      </div>

      {/* Status Update Action Bar */}
      <StatusControl currentStatus={currentStatus} orderId={id} />

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left 2 Cols: Order Line Items */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="border-b border-border py-4">
              <CardTitle className="flex items-center gap-2 text-base font-medium">
                <Package className="h-4 w-4 text-primary" />
                Line Items ({(order.items || []).length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-border bg-muted/40 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <tr>
                      <th className="px-6 py-3">Item</th>
                      <th className="px-6 py-3">Price</th>
                      <th className="px-6 py-3">Qty</th>
                      <th className="px-6 py-3 text-right">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {(order.items || []).map((item) => {
                      const img = item.product ? getProductPrimaryImage(item.product) : null;

                      return (
                        <tr key={item.id}>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              {img?.thumbnailUrl ? (
                                <img
                                  src={resolveImageUrl(img.thumbnailUrl)}
                                  alt={item.product?.name || "Product"}
                                  className="h-12 w-12 rounded-sm object-cover border border-border shrink-0 bg-surface"
                                />
                              ) : (
                                <div className="h-12 w-12 rounded-sm bg-muted flex items-center justify-center shrink-0 text-xs text-muted-foreground">
                                  No img
                                </div>
                              )}
                              <div className="min-w-0">
                                <p className="font-medium text-foreground truncate max-w-[240px]">
                                  {item.product?.name || `Product #${item.productId}`}
                                </p>
                                <p className="font-mono text-xs text-muted-foreground">
                                  SKU: PRD-{item.productId}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <PriceTag amount={item.price} size="sm" />
                          </td>
                          <td className="px-6 py-4 font-mono text-xs text-foreground">
                            {item.quantity}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <PriceTag amount={item.price * item.quantity} size="sm" />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Col: Customer Details & Financial Summary */}
        <div className="space-y-6">
          {/* Customer Information Card */}
          <Card>
            <CardHeader className="border-b border-border py-4">
              <CardTitle className="flex items-center gap-2 text-base font-medium">
                <User className="h-4 w-4 text-primary" />
                Customer Info
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 p-5 text-sm">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Name
                </p>
                <p className="font-medium text-foreground">
                  {order.user ? `${order.user.firstName} ${order.user.lastName}` : "Guest User"}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Email
                </p>
                <p className="font-mono text-xs text-foreground truncate">{order.user?.email || "N/A"}</p>
              </div>
            </CardContent>
          </Card>

          {/* Shipping Address Card */}
          <Card>
            <CardHeader className="border-b border-border py-4">
              <CardTitle className="flex items-center gap-2 text-base font-medium">
                <MapPin className="h-4 w-4 text-primary" />
                Shipping Address
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 text-sm leading-relaxed text-muted-foreground">
              {order.address ? (
                <div>
                  <p className="font-medium text-foreground">{order.address.line1}</p>
                  {order.address.line2 && <p>{order.address.line2}</p>}
                  <p>
                    {order.address.city}, {order.address.governorate}{" "}
                    {order.address.postalCode || ""}
                  </p>
                  <p>{order.address.country}</p>
                </div>
              ) : (
                <p className="italic text-muted-foreground/70">Standard Shipping Address</p>
              )}
            </CardContent>
          </Card>

          {/* Financial Breakdown Card */}
          <Card>
            <CardHeader className="border-b border-border py-4">
              <CardTitle className="flex items-center gap-2 text-base font-medium">
                <CreditCard className="h-4 w-4 text-primary" />
                Payment Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 p-5 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <PriceTag amount={order.totalAmount} size="sm" />
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span className="text-xs text-muted-foreground">Free</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Tax</span>
                <span className="text-xs text-muted-foreground">Included</span>
              </div>
              <div className="flex justify-between border-t border-border pt-3 font-medium text-foreground">
                <span>Total Paid</span>
                <PriceTag amount={order.totalAmount} size="md" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
