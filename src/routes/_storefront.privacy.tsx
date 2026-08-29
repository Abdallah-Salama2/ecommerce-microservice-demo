import { createFileRoute } from "@tanstack/react-router";
import { Container } from "@/components/storefront/section";

export const Route = createFileRoute("/_storefront/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — My Store" },
      {
        name: "description",
        content:
          "Learn how My Store collects, uses, and protects your personal information when you shop with us.",
      },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <Container className="py-14 sm:py-20">
      <header className="max-w-2xl">
        <span className="rule-label">Legal</span>
        <h1 className="mt-4 font-display text-4xl font-normal leading-[1.02] tracking-tight sm:text-6xl">
          Privacy Policy
        </h1>
        <p className="mt-6 text-base leading-relaxed text-muted-foreground">
          Last updated — August 2026
        </p>
      </header>

      <div className="mt-14 max-w-3xl space-y-10">
        <section>
          <h2 className="font-display text-2xl font-normal tracking-tight">
            1. Information We Collect
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            We collect information you provide directly, such as your name,
            email address, shipping address, and payment details when you create
            an account or place an order. We also automatically collect certain
            technical data, including your IP address, browser type, and device
            information to improve your browsing experience.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-normal tracking-tight">
            2. How We Use Your Information
          </h2>
          <ul className="mt-4 space-y-3 text-base leading-relaxed text-muted-foreground">
            <li>
              <strong>Order Processing:</strong> To fulfill your orders, process
              payments, and send order confirmations and shipping updates.
            </li>
            <li>
              <strong>Account Management:</strong> To create and manage your
              account, including storing your preferences and order history.
            </li>
            <li>
              <strong>Customer Support:</strong> To respond to your inquiries and
              resolve any issues with your orders.
            </li>
            <li>
              <strong>Improvements:</strong> To analyze usage patterns and
              improve our products, services, and website performance.
            </li>
            <li>
              <strong>Communications:</strong> To send you promotional emails and
              updates — but only with your consent. You can opt out at any time.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-2xl font-normal tracking-tight">
            3. Information Sharing
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            We do not sell your personal information. We may share your data with
            trusted third-party service providers who assist us in operating our
            business — such as payment processors, shipping carriers, and
            analytics services. These partners are contractually obligated to
            protect your information and use it only for the purposes we specify.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-normal tracking-tight">
            4. Cookies & Tracking
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            We use cookies and similar tracking technologies to remember your
            preferences, keep you signed in, and understand how you interact
            with our site. You can manage your cookie preferences through your
            browser settings. Disabling cookies may limit certain features of
            our platform.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-normal tracking-tight">
            5. Data Security
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            We implement industry-standard security measures to protect your
            personal information, including encryption for data in transit and at
            rest. Access tokens are stored in memory only and refresh tokens are
            secured via httpOnly cookies. However, no method of transmission over
            the internet is 100% secure, and we cannot guarantee absolute
            security.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-normal tracking-tight">
            6. Your Rights
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            You have the right to access, correct, or delete your personal
            information at any time. You may also request a copy of the data we
            hold about you or ask us to restrict processing. To exercise these
            rights, please contact us through our{" "}
            <a
              href="/about#contact"
              className="text-primary underline underline-offset-4 transition-colors hover:text-primary/80"
            >
              contact form
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-normal tracking-tight">
            7. Data Retention
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            We retain your personal information for as long as your account is
            active or as needed to provide you with our services, comply with
            legal obligations, resolve disputes, and enforce our agreements.
            When data is no longer needed, it is securely deleted or anonymized.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-normal tracking-tight">
            8. Changes to This Policy
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            We may update this Privacy Policy from time to time. When we make
            significant changes, we will notify you by posting a prominent
            notice on our website or sending you an email. We encourage you to
            review this page periodically to stay informed.
          </p>
        </section>
      </div>
    </Container>
  );
}
