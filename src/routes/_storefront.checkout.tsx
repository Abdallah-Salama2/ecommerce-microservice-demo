import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PriceTag } from "@/components/ui/price-tag";
import { Container, SectionHeading } from "@/components/storefront/section";
import { useCart, useAddresses, useCreateAddress, useCreateOrder } from "@/hooks/use-api";

// Simple UUID generator for idempotency key
function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
import { useAuthStore } from "@/store/auth";
import { toast } from "sonner";
import type { Address } from "@/types";

export const Route = createFileRoute("/_storefront/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — My Store" },
      { name: "description", content: "Complete your purchase" },
    ],
  }),
  component: CheckoutPage,
});

type CheckoutStep = "auth" | "address" | "payment" | "processing";

function CheckoutPage() {
  const navigate = useNavigate();
  const { data: cartData, isLoading: cartLoading, error: cartError } = useCart();
  const { data: addressesData, isLoading: addressesLoading, refetch: refetchAddresses } = useAddresses();
  const createAddress = useCreateAddress();
  const createOrder = useCreateOrder();
  const { isAuthenticated, user } = useAuthStore();

  const [step, setStep] = useState<CheckoutStep>("auth");
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [isGuest, setIsGuest] = useState(false);
  const [guestEmail, setGuestEmail] = useState("");
  const [newAddress, setNewAddress] = useState<Partial<Address>>({
    fullName: "",
    phone: "",
    line1: "",
    line2: "",
    city: "",
    governorate: "",
    country: "Egypt",
    postalCode: "",
    isDefault: false,
  });
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const cart = cartData?.data;
  const items = cart?.items || [];
  const subtotal = cart?.subtotal || 0;
  const addresses = addressesData?.data || [];

  // Redirect if cart is empty
  if (!cartLoading && !cartError && (!cart || items.length === 0)) {
    navigate({ to: "/cart" });
    return null;
  }

  // Auto-advance to address step if already authenticated
  if (step === "auth" && isAuthenticated) {
    setStep("address");
  }

  const handleGuestCheckout = () => {
    if (!guestEmail || !guestEmail.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }
    setIsGuest(true);
    setStep("address");
  };

  const handleLogin = () => {
    navigate({ to: "/login", search: { redirect: "/checkout" } });
  };

  const handleAddressSelect = (addressId: string) => {
    setSelectedAddressId(addressId);
  };

  const handleNewAddressSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddress.fullName || !newAddress.phone || !newAddress.line1 || !newAddress.city || !newAddress.governorate) {
      toast.error("Please fill in all required address fields");
      return;
    }

    try {
      await createAddress.mutateAsync(newAddress as Omit<Address, "id">);
      toast.success("Address added successfully");
      setShowNewAddressForm(false);
      setNewAddress({
        fullName: "",
        phone: "",
        line1: "",
        line2: "",
        city: "",
        governorate: "",
        country: "Egypt",
        postalCode: "",
        isDefault: false,
      });
      refetchAddresses();
    } catch (error) {
      toast.error("Failed to add address");
    }
  };

  const handleProceedToPayment = () => {
    if (!selectedAddressId && !isGuest) {
      toast.error("Please select a shipping address");
      return;
    }
    setStep("payment");
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddressId && !isGuest) {
      toast.error("Please select a shipping address");
      return;
    }

    setIsSubmitting(true);
    setStep("processing");

    try {
      const addressId = selectedAddressId ? parseInt(selectedAddressId, 10) : 0;
      const idempotencyKey = generateUUID();

      const result = await createOrder.mutateAsync({
        addressId,
        idempotencyKey,
      });

      toast.success("Order placed successfully!");
      navigate({ to: "/order-confirmation/$id", params: { id: result.data.id } });
    } catch (error) {
      toast.error("Failed to place order. Please try again.");
      setStep("payment");
      setIsSubmitting(false);
    }
  };

  if (cartLoading || addressesLoading) {
    return (
      <Container className="py-14 sm:py-20">
        <div className="flex min-h-[50vh] items-center justify-center">
          <p className="text-muted-foreground">Loading checkout...</p>
        </div>
      </Container>
    );
  }

  if (cartError) {
    return (
      <Container className="py-14 sm:py-20">
        <div className="flex min-h-[50vh] flex-col items-center justify-center">
          <p className="text-destructive mb-4">Failed to load cart. Please try again later.</p>
          <Button asChild variant="secondary">
            <Link to="/cart">Return to cart</Link>
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-14 sm:py-20">
      <header className="max-w-2xl">
        <span className="rule-label">Checkout</span>
        <h1 className="mt-4 font-display text-4xl font-normal leading-[1.02] tracking-tight sm:text-6xl">
          Complete your order
        </h1>
      </header>

      <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_20rem] lg:gap-20">
        <div className="space-y-8">
          {/* Step 1: Auth or Guest */}
          {step === "auth" && (
            <Card>
              <CardHeader>
                <CardTitle>Step 1: Account</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="w-full"
                    onClick={handleLogin}
                  >
                    Sign in to existing account
                  </Button>
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-border" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-card px-2 text-muted-foreground">Or continue as guest</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="guest-email" className="text-sm font-medium">
                        Email address
                      </label>
                      <Input
                        id="guest-email"
                        type="email"
                        placeholder="you@example.com"
                        value={guestEmail}
                        onChange={(e) => setGuestEmail(e.target.value)}
                        className="mt-2"
                      />
                    </div>
                    <Button
                      variant="primary"
                      size="lg"
                      className="w-full"
                      onClick={handleGuestCheckout}
                    >
                      Continue as guest
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Shipping Address */}
          {step === "address" && (
            <Card>
              <CardHeader>
                <CardTitle>Step 2: Shipping Address</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {!isGuest && addresses.length > 0 && (
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">Select an existing address:</p>
                    {addresses.map((address) => (
                      <div
                        key={address.id}
                        className={`cursor-pointer rounded-lg border p-4 transition-colors ${selectedAddressId === address.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-foreground/40"
                          }`}
                        onClick={() => handleAddressSelect(address.id)}
                      >
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
                            <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                              Default
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">
                      {showNewAddressForm ? "Cancel" : "Or add a new address"}
                    </span>
                  </div>
                </div>

                {!showNewAddressForm ? (
                  <Button
                    variant="secondary"
                    size="lg"
                    className="w-full"
                    onClick={() => setShowNewAddressForm(true)}
                  >
                    Add new address
                  </Button>
                ) : (
                  <form onSubmit={handleNewAddressSubmit} className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="fullName" className="text-sm font-medium">
                          Full name
                        </label>
                        <Input
                          id="fullName"
                          placeholder="John Doe"
                          value={newAddress.fullName}
                          onChange={(e) => setNewAddress({ ...newAddress, fullName: e.target.value })}
                          className="mt-2"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="text-sm font-medium">
                          Phone
                        </label>
                        <Input
                          id="phone"
                          placeholder="+20 123 456 7890"
                          value={newAddress.phone}
                          onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                          className="mt-2"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="line1" className="text-sm font-medium">
                        Address line 1
                      </label>
                      <Input
                        id="line1"
                        placeholder="123 Main St"
                        value={newAddress.line1}
                        onChange={(e) => setNewAddress({ ...newAddress, line1: e.target.value })}
                        className="mt-2"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="line2" className="text-sm font-medium">
                        Address line 2 (optional)
                      </label>
                      <Input
                        id="line2"
                        placeholder="Apt 4B"
                        value={newAddress.line2}
                        onChange={(e) => setNewAddress({ ...newAddress, line2: e.target.value })}
                        className="mt-2"
                      />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="city" className="text-sm font-medium">
                          City
                        </label>
                        <Input
                          id="city"
                          placeholder="Cairo"
                          value={newAddress.city}
                          onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                          className="mt-2"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="governorate" className="text-sm font-medium">
                          Governorate
                        </label>
                        <Input
                          id="governorate"
                          placeholder="Cairo"
                          value={newAddress.governorate}
                          onChange={(e) => setNewAddress({ ...newAddress, governorate: e.target.value })}
                          className="mt-2"
                          required
                        />
                      </div>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="country" className="text-sm font-medium">
                          Country
                        </label>
                        <Input
                          id="country"
                          placeholder="Egypt"
                          value={newAddress.country}
                          onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })}
                          className="mt-2"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="postalCode" className="text-sm font-medium">
                          Postal code (optional)
                        </label>
                        <Input
                          id="postalCode"
                          placeholder="12345"
                          value={newAddress.postalCode}
                          onChange={(e) => setNewAddress({ ...newAddress, postalCode: e.target.value })}
                          className="mt-2"
                        />
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <Button
                        type="button"
                        variant="secondary"
                        size="lg"
                        className="flex-1"
                        onClick={() => {
                          setShowNewAddressForm(false);
                          setNewAddress({
                            fullName: "",
                            phone: "",
                            line1: "",
                            line2: "",
                            city: "",
                            governorate: "",
                            country: "Egypt",
                            postalCode: "",
                            isDefault: false,
                          });
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        className="flex-1"
                        disabled={createAddress.isPending}
                      >
                        {createAddress.isPending ? "Adding..." : "Add address"}
                      </Button>
                    </div>
                  </form>
                )}

                <Button
                  variant="primary"
                  size="lg"
                  className="w-full"
                  onClick={handleProceedToPayment}
                  disabled={!selectedAddressId && !isGuest}
                >
                  Continue to payment
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Payment */}
          {step === "payment" && (
            <Card>
              <CardHeader>
                <CardTitle>Step 3: Payment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-lg bg-muted p-4">
                  <p className="text-sm text-muted-foreground">
                    This is a payment placeholder. No real payment will be processed.
                  </p>
                </div>

                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handlePlaceOrder(); }}>
                  <div>
                    <label htmlFor="card-number" className="text-sm font-medium">
                      Card number
                    </label>
                    <Input
                      id="card-number"
                      placeholder="1234 5678 9012 3456"
                      className="mt-2"
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="expiry" className="text-sm font-medium">
                        Expiry date
                      </label>
                      <Input
                        id="expiry"
                        placeholder="MM/YY"
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <label htmlFor="cvc" className="text-sm font-medium">
                        CVC
                      </label>
                      <Input
                        id="cvc"
                        placeholder="123"
                        className="mt-2"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="card-name" className="text-sm font-medium">
                      Name on card
                    </label>
                    <Input
                      id="card-name"
                      placeholder="John Doe"
                      className="mt-2"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Processing..." : `Place order — $${subtotal.toFixed(2)}`}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Processing State */}
          {step === "processing" && (
            <Card>
              <CardContent className="py-12">
                <div className="flex flex-col items-center justify-center space-y-4">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                  <p className="text-lg font-medium">Processing your order...</p>
                  <p className="text-sm text-muted-foreground">Please don't close this page</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Order Summary */}
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <Card>
            <CardHeader>
              <CardTitle>Order summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.cartItemId} className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium truncate">{item.productName}</p>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <PriceTag amount={item.price * item.quantity} size="sm" />
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <PriceTag amount={subtotal} size="md" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-sm">Calculated at checkout</span>
                </div>
              </div>

              <div className="border-t border-border pt-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Total</span>
                  <PriceTag amount={subtotal} size="lg" />
                </div>
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </Container>
  );
}
