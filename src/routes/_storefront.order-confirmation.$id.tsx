import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PriceTag } from "@/components/ui/price-tag";
import { Container } from "@/components/storefront/section";
import { useOrder, useCancelOrder } from "@/hooks/use-api";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { useAuthStore } from "@/store/auth";

export const Route = createFileRoute("/_storefront/order-confirmation/$id")({
  head: () => ({
    meta: [
      { title: "Order Confirmation — My Store" },
      { name: "description", content: "View your order confirmation" },
    ],
  }),
  component: OrderConfirmationPage,
});

function OrderConfirmationPage() {
  const { id } = Route.useParams();
  const { data: orderData, isLoading, error, refetch } = useOrder(id);
  const cancelOrder = useCancelOrder();
  const { user } = useAuthStore();

  const order = orderData?.data;

  const handleCancelOrder = async () => {
    if (
      !window.confirm(
        "Are you sure you want to cancel this order? This cannot be undone.",
      )
    ) {
      return;
    }
    try {
      await cancelOrder.mutateAsync(id);
      toast.success("Order cancelled successfully");
      refetch();
    } catch (error) {
      toast.error("Failed to cancel order. Please try again.");
    }
  };

  const canCancelOrder =
    order?.status?.toLowerCase() === "pending" ||
    order?.status?.toLowerCase() === "processing";

  const getStatusVariant = (status: string) => {
    const s = status.toLowerCase();
    if (s === "pending") return "pending";
    if (s === "processing") return "processing";
    if (s === "confirmed") return "confirmed";
    if (s === "shipped") return "shipped";
    if (s === "delivered") return "delivered";
    if (s === "cancelled") return "cancelled";
    return "default";
  };

  if (isLoading) {
    return (
      <ProtectedRoute>
        <Container className="py-14 sm:py-20">
          <div className="flex min-h-[50vh] items-center justify-center">
            <p className="text-muted-foreground">Loading order details...</p>
          </div>
        </Container>
      </ProtectedRoute>
    );
  }

  // Check ownership: order must exist and match logged in user's ID
  const isOrderOwner =
    order &&
    (!order.userId || !user?.id || String(order.userId) === String(user.id));

  if (error || !order || !isOrderOwner) {
    return (
      <ProtectedRoute>
        <Container className="py-14 sm:py-20">
          <div className="flex min-h-[50vh] flex-col items-center justify-center">
            <p className="text-destructive mb-4">Order not found.</p>
            <p className="text-sm text-muted-foreground mb-6">
              The requested order does not exist or you do not have permission
              to view it.
            </p>
            <Button asChild variant="secondary">
              <Link to="/shop">Return to shop</Link>
            </Button>
          </div>
        </Container>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <Container className="py-14 sm:py-20">
        <header className="max-w-2xl">
          <span className="rule-label">Order Confirmation</span>
          <h1 className="mt-4 font-display text-4xl font-normal leading-[1.02] tracking-tight sm:text-6xl">
            Thank you for your order!
          </h1>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            Your order has been received and is being processed.
          </p>
        </header>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_20rem] lg:gap-20">
          <div className="space-y-8">
            {/* Order Details */}
            <Card>
              <CardHeader>
                <CardTitle>Order Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-sm text-muted-foreground">Order ID</p>
                    <p className="font-medium">{order.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <Badge variant={getStatusVariant(order.status)}>
                      {order.status}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Date</p>
                    <p className="font-medium">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total</p>
                    <PriceTag amount={order.totalAmount} size="md" />
                  </div>
                </div>
                {canCancelOrder && (
                  <div className="pt-4 border-t border-border">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={handleCancelOrder}
                      disabled={cancelOrder.isPending}
                    >
                      {cancelOrder.isPending ? "Cancelling..." : "Cancel order"}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Order Items */}
            <Card>
              <CardHeader>
                <CardTitle>Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.items?.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start justify-between gap-4 border-b border-border pb-4 last:border-0 last:pb-0"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="font-medium">
                          {item.productTitle || `Product #${item.productId}`}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <PriceTag amount={item.totalPrice} size="md" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {order.items?.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start justify-between gap-4"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium truncate">
                          {item.productTitle || `Product #${item.productId}`}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <PriceTag amount={item.totalPrice} size="sm" />
                    </div>
                  ))}
                </div>

                <div className="border-t border-border pt-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <PriceTag
                      amount={order.subtotal || order.totalAmount}
                      size="md"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-sm">Included</span>
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Total</span>
                    <PriceTag amount={order.totalAmount} size="lg" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button variant="primary" size="lg" className="mt-6 w-full" asChild>
              <Link to="/shop">Continue shopping</Link>
            </Button>
          </aside>
        </div>
      </Container>
    </ProtectedRoute>
  );
}
