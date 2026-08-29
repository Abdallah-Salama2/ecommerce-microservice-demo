import { createFileRoute } from "@tanstack/react-router";
import { Container } from "@/components/storefront/section";

export const Route = createFileRoute("/_storefront/shipping-policy")({
  head: () => ({
    meta: [
      { title: "Shipping Policy — My Store" },
      {
        name: "description",
        content:
          "Learn about My Store's shipping options, delivery times, tracking, and international shipping details.",
      },
    ],
  }),
  component: ShippingPolicyPage,
});

function ShippingPolicyPage() {
  return (
    <Container className="py-14 sm:py-20">
      <header className="max-w-2xl">
        <span className="rule-label">Policies</span>
        <h1 className="mt-4 font-display text-4xl font-normal leading-[1.02] tracking-tight sm:text-6xl">
          Shipping Policy
        </h1>
        <p className="mt-6 text-base leading-relaxed text-muted-foreground">
          Everything you need to know about how we get your order to you.
        </p>
      </header>

      <div className="mt-14 max-w-3xl space-y-10">
        <section>
          <h2 className="font-display text-2xl font-normal tracking-tight">
            Processing Time
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Orders are typically processed within 1–2 business days after
            payment confirmation. During peak seasons or promotional events,
            processing may take an additional 1–2 business days. You'll receive
            a confirmation email with tracking information once your order has
            shipped.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-normal tracking-tight">
            Shipping Options
          </h2>
          <div className="mt-4 overflow-hidden rounded-md border border-border">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-4 py-3 font-medium">Method</th>
                  <th className="px-4 py-3 font-medium">Estimated Delivery</th>
                  <th className="px-4 py-3 font-medium">Cost</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border">
                  <td className="px-4 py-3">Standard Shipping</td>
                  <td className="px-4 py-3">5–7 business days</td>
                  <td className="px-4 py-3">$4.99</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-4 py-3">Express Shipping</td>
                  <td className="px-4 py-3">2–3 business days</td>
                  <td className="px-4 py-3">$9.99</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Next-Day Delivery</td>
                  <td className="px-4 py-3">1 business day</td>
                  <td className="px-4 py-3">$14.99</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Orders over $200 qualify for free standard shipping.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-normal tracking-tight">
            Order Tracking
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Once your order ships, you will receive a shipping confirmation
            email with a tracking number. You can also track your order status
            from your account dashboard. Please allow up to 24 hours for
            tracking information to become available after shipment.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-normal tracking-tight">
            International Shipping
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            We currently ship to select international destinations. Delivery
            times for international orders typically range from 7–14 business
            days depending on the destination. International orders may be
            subject to customs duties and import taxes, which are the
            responsibility of the customer.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-normal tracking-tight">
            Delivery Issues
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            If your order arrives damaged, incomplete, or not at all, please
            contact us within 7 days of the expected delivery date. We'll work
            with you to resolve the issue — whether that means reshipping,
            issuing a refund, or providing a replacement. Please reach out
            through our{" "}
            <a
              href="/about#contact"
              className="text-primary underline underline-offset-4 transition-colors hover:text-primary/80"
            >
              contact form
            </a>
            .
          </p>
        </section>
      </div>
    </Container>
  );
}
