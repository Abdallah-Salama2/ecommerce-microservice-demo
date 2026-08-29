import { createFileRoute } from "@tanstack/react-router";
import { Container } from "@/components/storefront/section";

export const Route = createFileRoute("/_storefront/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — My Store" },
      {
        name: "description",
        content:
          "Read the terms and conditions governing your use of My Store and purchases made through our platform.",
      },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <Container className="py-14 sm:py-20">
      <header className="max-w-2xl">
        <span className="rule-label">Legal</span>
        <h1 className="mt-4 font-display text-4xl font-normal leading-[1.02] tracking-tight sm:text-6xl">
          Terms of Service
        </h1>
        <p className="mt-6 text-base leading-relaxed text-muted-foreground">
          Last updated — August 2026
        </p>
      </header>

      <div className="prose-store mt-14 max-w-3xl space-y-10">
        <section>
          <h2 className="font-display text-2xl font-normal tracking-tight">
            1. Acceptance of Terms
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            By accessing or using My Store ("we", "our", "us"), you agree to be
            bound by these Terms of Service. If you do not agree to all of these
            terms, you may not access or use our services. We reserve the right
            to update or modify these terms at any time, and your continued use
            of the platform constitutes acceptance of any changes.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-normal tracking-tight">
            2. Eligibility
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            You must be at least 18 years of age or the age of majority in your
            jurisdiction to create an account and make purchases. By using My
            Store, you represent and warrant that you meet these requirements and
            that all information you provide is accurate and complete.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-normal tracking-tight">
            3. Accounts & Security
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            You are responsible for maintaining the confidentiality of your
            account credentials and for all activities that occur under your
            account. You agree to notify us immediately of any unauthorized use
            of your account. We are not liable for any loss or damage arising
            from your failure to protect your account information.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-normal tracking-tight">
            4. Products & Pricing
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            We make every effort to display products accurately, including
            descriptions, images, and pricing. However, we do not guarantee that
            all information is error-free. Prices are listed in US dollars and
            are subject to change without notice. In the event of a pricing
            error, we reserve the right to cancel any orders placed at the
            incorrect price.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-normal tracking-tight">
            5. Orders & Payment
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            When you place an order, you are making an offer to purchase the
            items in your cart. All orders are subject to acceptance and
            availability. We accept major credit cards, debit cards, and other
            payment methods as displayed at checkout. You agree to provide
            current, complete, and accurate payment information.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-normal tracking-tight">
            6. Intellectual Property
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            All content on My Store — including text, graphics, logos, images,
            and software — is the property of My Store or its licensors and is
            protected by copyright, trademark, and other intellectual property
            laws. You may not reproduce, distribute, or create derivative works
            from our content without prior written consent.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-normal tracking-tight">
            7. Limitation of Liability
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            To the fullest extent permitted by law, My Store shall not be liable
            for any indirect, incidental, special, consequential, or punitive
            damages arising from your use of our services or products. Our total
            liability shall not exceed the amount you paid for the product or
            service giving rise to the claim.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-normal tracking-tight">
            8. Governing Law
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            These terms shall be governed by and construed in accordance with the
            laws of your local jurisdiction, without regard to conflict of law
            principles. Any disputes arising under these terms will be resolved
            in the courts of the applicable jurisdiction.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-normal tracking-tight">
            9. Contact
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            If you have any questions about these Terms of Service, please reach
            out to us through our{" "}
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
