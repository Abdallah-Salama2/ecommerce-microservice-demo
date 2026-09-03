import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PriceTag } from "@/components/ui/price-tag";
import { Badge } from "@/components/ui/badge";
import { Container, SectionHeading } from "@/components/storefront/section";
import { useOrders, useAddresses } from "@/hooks/use-api";
import { useAuthStore } from "@/store/auth";
import { ProtectedRoute } from "@/components/auth/protected-route";

export const Route = createFileRoute("/_storefront/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — My Store" },
      { name: "description", content: "Manage your orders and addresses" },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const { data: ordersData, isLoading: ordersLoading } = useOrders();
  const { data: addressesData, isLoading: addressesLoading } = useAddresses();
  const { user } = useAuthStore();

  const orders = ordersData?.data || [];
  const addresses = addressesData?.data || [];

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

  return (
    <ProtectedRoute>
      <Container className="py-14 sm:py-20">
        <header className="max-w-2xl">
          <span className="rule-label">Dashboard</span>
          <h1 className="mt-4 font-display text-4xl font-normal leading-[1.02] tracking-tight sm:text-6xl">
            Welcome back, {user?.firstName || 'User'}
          </h1>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            Manage your orders and addresses
          </p>
        </header>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_20rem] lg:gap-20">
          <div className="space-y-12">
            {/* Orders Section */}
            <section>
              <SectionHeading
                eyebrow={`${orders.length} order${orders.length !== 1 ? 's' : ''}`}
                title="Your orders"
                action={
                  <Button variant="secondary" size="sm" asChild>
                    <Link to="/shop">Start shopping</Link>
                  </Button>
                }
              />

              {ordersLoading ? (
                <div className="mt-8 flex items-center justify-center py-12">
                  <p className="text-muted-foreground">Loading orders...</p>
                </div>
              ) : orders.length === 0 ? (
                <div className="mt-8 flex flex-col items-center justify-center py-12 border border-border rounded-lg">
                  <p className="text-lg font-medium">No orders yet</p>
                  <p className="mt-2 text-muted-foreground">When you place an order, it will appear here.</p>
                  <Button variant="primary" size="lg" className="mt-6" asChild>
                    <Link to="/shop">Start shopping</Link>
                  </Button>
                </div>
              ) : (
                <div className="mt-8 space-y-4">
                  {orders.map((order) => (
                    <Card key={order.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between gap-4">
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-3">
                              <p className="font-medium">Order #{order.id}</p>
                              <Badge variant={getStatusVariant(order.status)}>
                                {order.status}
                              </Badge>
                            </div>
                            <p className="mt-1 text-sm text-muted-foreground">
                              {new Date(order.createdAt).toLocaleDateString()}
                            </p>
                            {order.itemCount && (
                              <p className="mt-1 text-sm text-muted-foreground">
                                {order.itemCount} item{order.itemCount !== 1 ? 's' : ''}
                              </p>
                            )}
                          </div>
                          <div className="text-right">
                            <PriceTag amount={order.totalAmount} size="md" />
                            <Button
                              variant="ghost"
                              size="sm"
                              className="mt-2"
                              asChild
                            >
                              <Link to="/order-confirmation/$id" params={{ id: order.id }}>
                                View details
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </section>

            {/* Addresses Section */}
            <section>
              <SectionHeading
                eyebrow={`${addresses.length} address${addresses.length !== 1 ? 'es' : ''}`}
                title="Your addresses"
                action={
                  <Button variant="secondary" size="sm" asChild>
                    <Link to="/checkout">Add new address</Link>
                  </Button>
                }
              />

              {addressesLoading ? (
                <div className="mt-8 flex items-center justify-center py-12">
                  <p className="text-muted-foreground">Loading addresses...</p>
                </div>
              ) : addresses.length === 0 ? (
                <div className="mt-8 flex flex-col items-center justify-center py-12 border border-border rounded-lg">
                  <p className="text-lg font-medium">No addresses saved</p>
                  <p className="mt-2 text-muted-foreground">Save an address to make checkout faster.</p>
                  <Button variant="primary" size="lg" className="mt-6" asChild>
                    <Link to="/checkout">Add address</Link>
                  </Button>
                </div>
              ) : (
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {addresses.map((address) => (
                    <Card key={address.id}>
                      <CardContent className="p-6">
                        <div className="space-y-1">
                          <p className="font-medium">{address.fullName}</p>
                          <p className="text-sm text-muted-foreground">{address.phone}</p>
                          <p className="text-sm text-muted-foreground">{address.line1}</p>
                          {address.line2 && (
                            <p className="text-sm text-muted-foreground">{address.line2}</p>
                          )}
                          <p className="text-sm text-muted-foreground">
                            {address.city}, {address.governorate}
                          </p>
                          <p className="text-sm text-muted-foreground">{address.country}</p>
                          {address.isDefault && (
                            <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary mt-2">
                              Default
                            </span>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </section>
          </div>

          {/* Quick Actions Sidebar */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <Card>
              <CardHeader>
                <CardTitle>Quick actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="secondary" size="lg" className="w-full justify-start" asChild>
                  <Link to="/shop">Shop all products</Link>
                </Button>
                <Button variant="secondary" size="lg" className="w-full justify-start" asChild>
                  <Link to="/cart">View cart</Link>
                </Button>
                <Button variant="secondary" size="lg" className="w-full justify-start" asChild>
                  <Link to="/checkout">Checkout</Link>
                </Button>
                <Button variant="secondary" size="lg" className="w-full justify-start" asChild>
                  <Link to="/account/wishlist">Go to wishlist</Link>
                </Button>
              </CardContent>
            </Card>
          </aside>
        </div>
      </Container>
    </ProtectedRoute>
  );
}
