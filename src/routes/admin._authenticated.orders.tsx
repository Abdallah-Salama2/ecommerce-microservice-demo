import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Eye,
  ShoppingCart,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PriceTag } from "@/components/ui/price-tag";
import { Skeleton } from "@/components/ui/skeleton";
import { TableRowSkeleton } from "@/components/ui/skeletons";
import { useAdminOrders } from "@/hooks/use-api";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/_authenticated/orders")({
  component: AdminOrdersListPage,
});

const STATUS_TABS = [
  { key: "ALL", label: "All Orders" },
  { key: "Pending", label: "Pending" },
  { key: "Processing", label: "Processing" },
  { key: "Confirmed", label: "Confirmed" },
  { key: "Shipped", label: "Shipped" },
  { key: "Delivered", label: "Delivered" },
  { key: "Cancelled", label: "Cancelled" },
];

function AdminOrdersListPage() {
  const [activeTab, setActiveTab] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const statusParam = activeTab === "ALL" ? undefined : activeTab;
  const { data, isLoading, error } = useAdminOrders({
    page: currentPage,
    pageSize: 10,
    ...(statusParam ? { status: statusParam } : {}),
  });

  const orders = data?.data || [];
  const pagination = data?.pagination;

  // Filter orders by search term client-side for immediate response
  const filteredOrders = orders.filter((order) => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    const orderIdStr = String(order.id).toLowerCase();
    const email = order.user?.email?.toLowerCase() || "";
    const name =
      `${order.user?.firstName || ""} ${order.user?.lastName || ""}`.toLowerCase();
    return (
      orderIdStr.includes(term) || email.includes(term) || name.includes(term)
    );
  });

  const getStatusBadgeVariant = (status: string) => {
    switch (status.toUpperCase()) {
      case "PENDING":
        return "pending";
      case "PROCESSING":
        return "processing";
      case "CONFIRMED":
        return "confirmed";
      case "SHIPPED":
        return "shipped";
      case "DELIVERED":
        return "delivered";
      case "CANCELLED":
        return "cancelled";
      default:
        return "default";
    }
  };

  return (
    <div className="space-y-8 p-6 lg:p-8">
      {/* Top Header */}
      <div>
        <h1 className="font-display text-2xl font-normal tracking-tight text-foreground sm:text-3xl">
          Orders Management
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Monitor customer orders, review details, and update fulfillment
          statuses.
        </p>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-border pb-4">
        {STATUS_TABS.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => {
                setActiveTab(tab.key);
                setCurrentPage(1);
              }}
              className={cn(
                "rounded-md px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground hover:bg-accent hover:text-foreground",
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Main Table Card */}
      <Card>
        <CardHeader className="border-b border-border py-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="text-base font-medium">
              Orders ({pagination?.totalItems ?? filteredOrders.length})
            </CardTitle>
            <div className="relative max-w-xs w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search order ID or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-md border border-input bg-background pl-9 pr-3 py-1.5 text-sm focus-visible:outline-2 focus-visible:outline-primary"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-border bg-muted/40 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="px-6 py-3">Order ID</th>
                    <th className="px-6 py-3">Customer</th>
                    <th className="px-6 py-3">Items</th>
                    <th className="px-6 py-3">Total Amount</th>
                    <th className="px-6 py-3">Date</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3 text-right">Workstation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <TableRowSkeleton key={i} columns={7} />
                  ))}
                </tbody>
              </table>
            </div>
          ) : error ? (
            <div className="p-12 text-center text-destructive">
              Failed to load orders.
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="p-12 text-center text-muted-foreground">
              No orders found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-border bg-muted/40 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="px-6 py-3">Order ID</th>
                    <th className="px-6 py-3">Customer</th>
                    <th className="px-6 py-3">Items</th>
                    <th className="px-6 py-3">Total Amount</th>
                    <th className="px-6 py-3">Date</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3 text-right">Workstation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredOrders.map((order) => {
                    const statusVariant = getStatusBadgeVariant(order.status);
                    const itemCount = order.itemCount ?? 0;
                    const dateStr = new Date(
                      order.createdAt,
                    ).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });

                    return (
                      <tr
                        key={order.id}
                        className="hover:bg-muted/30 transition-colors"
                      >
                        <td className="px-6 py-4 font-mono text-xs font-semibold text-foreground">
                          #{order.id}
                        </td>
                        <td className="px-6 py-4">
                          <div className="min-w-0">
                            <p className="truncate font-medium text-foreground max-w-[180px]">
                              {order.user
                                ? `${order.user.firstName} ${order.user.lastName}`
                                : "Guest User"}
                            </p>
                            <p className="truncate text-xs text-muted-foreground max-w-[180px]">
                              {order.user?.email || "No email"}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-muted-foreground font-mono text-xs">
                          {itemCount} {itemCount === 1 ? "item" : "items"}
                        </td>
                        <td className="px-6 py-4">
                          <PriceTag amount={order.totalAmount} size="sm" />
                        </td>
                        <td className="px-6 py-4 text-xs text-muted-foreground whitespace-nowrap">
                          {dateStr}
                        </td>
                        <td className="px-6 py-4">
                          <Badge
                            variant={statusVariant}
                            className="whitespace-nowrap"
                          >
                            {order.status}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Button
                            asChild
                            variant="secondary"
                            size="sm"
                            className="gap-1.5"
                          >
                            <Link
                              to="/admin/orders/$id"
                              params={{ id: String(order.id) }}
                            >
                              <Eye className="h-3.5 w-3.5" />
                              Inspect
                            </Link>
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination Controls */}
          {pagination && pagination.totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-border px-6 py-4">
              <p className="text-xs text-muted-foreground">
                Page {pagination.currentPage} of {pagination.totalPages}
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage <= 1}
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  className="gap-1"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage >= pagination.totalPages}
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  className="gap-1"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
