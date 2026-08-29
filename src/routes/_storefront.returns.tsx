import { createFileRoute } from "@tanstack/react-router";
import { Container } from "@/components/storefront/section";

export const Route = createFileRoute("/_storefront/returns")({
  head: () => ({
    meta: [
      { title: "Returns & Refunds — My Store" },
      {
        name: "description",
        content:
          "Learn about My Store's return and refund policies, including eligibility, timelines, and how to initiate a return.",
      },
    ],
  }),
  component: ReturnsPage,
});

function ReturnsPage() {
  return (
    <Container className="py-14 sm:py-20">
      <header className="max-w-2xl">
        <span className="rule-label">Policies</span>
        <h1 className="mt-4 font-display text-4xl font-normal leading-[1.02] tracking-tight sm:text-6xl">
          Returns & Refunds
        </h1>
        <p className="mt-6 text-base leading-relaxed text-muted-foreground">
          We want you to be completely satisfied with your purchase. Here's what
          to do if something isn't right.
        </p>
      </header>

      <div className="mt-14 max-w-3xl space-y-10">
        <section>
          <h2 className="font-display text-2xl font-normal tracking-tight">
            Return Policy
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            We accept returns within 30 days of delivery. Items must be in their
            original condition — unused, unworn, and with all tags attached.
            Products that have been personalized, altered, or used beyond
            reasonable inspection are not eligible for return.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-normal tracking-tight">
            How to Initiate a Return
          </h2>
          <ol className="mt-4 list-decimal space-y-3 pl-6 text-base leading-relaxed text-muted-foreground">
            <li>
              Log in to your account and navigate to your order history on the
              dashboard.
            </li>
            <li>
              Select the order containing the item(s) you wish to return and
              note the order number.
            </li>
            <li>
              Contact us through our{" "}
              <a
                href="/about#contact"
                className="text-primary underline underline-offset-4 transition-colors hover:text-primary/80"
              >
                contact form
              </a>{" "}
              with your order number and reason for return.
            </li>
            <li>
              Our team will review your request within 2 business days and send
              you a prepaid return label if approved.
            </li>
            <li>
              Ship the item(s) back using the provided label. Please keep the
              tracking number for your records.
            </li>
          </ol>
        </section>

        <section>
          <h2 className="font-display text-2xl font-normal tracking-tight">
            Refund Process
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Once we receive and inspect your returned item, we will notify you
            of the approval or rejection of your refund. Approved refunds are
            processed within 5–7 business days and credited to your original
            payment method. Please note that it may take an additional 2–5
            business days for the refund to appear in your account, depending on
            your bank or card issuer.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-normal tracking-tight">
            Exchanges
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            We currently do not offer direct exchanges. If you'd like a
            different size, color, or product, please return the original item
            for a refund and place a new order. This ensures the fastest
            turnaround time for you.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-normal tracking-tight">
            Non-Returnable Items
          </h2>
          <ul className="mt-4 space-y-2 text-base leading-relaxed text-muted-foreground">
            <li>• Gift cards and downloadable products</li>
            <li>• Personal care and hygiene items (opened)</li>
            <li>• Items marked as final sale</li>
            <li>• Products damaged through misuse or neglect</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-2xl font-normal tracking-tight">
            Damaged or Defective Items
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            If you receive a damaged or defective item, please contact us within
            48 hours of delivery with photos of the damage. We'll arrange for a
            replacement or full refund at no additional cost to you — including
            return shipping.
          </p>
        </section>
      </div>
    </Container>
  );
}
