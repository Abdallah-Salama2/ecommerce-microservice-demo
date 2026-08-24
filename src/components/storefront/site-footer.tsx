import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field } from "@/components/ui/field";
import { Container } from "@/components/storefront/section";

export function SiteFooter() {
  return (
    <footer className="mt-28 border-t border-border bg-surface">
      <Container className="grid gap-12 py-16 md:grid-cols-[1.2fr_1fr] md:py-20">
        <div className="max-w-md">
          <p className="font-display text-2xl leading-snug tracking-tight">
            Quality goods for everyday life, delivered to your door.
          </p>
          <div className="mt-8 flex flex-wrap gap-6">
            <Link to="/shop" className="rule-label transition-colors hover:text-foreground">
              Catalog
            </Link>
            <span className="rule-label">Care guide</span>
            <span className="rule-label">Shipping</span>
            <span className="rule-label">Contact</span>
          </div>
        </div>

        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => e.preventDefault()}
          aria-label="Newsletter"
        >
          <Field label="Studio letter" htmlFor="footer-email" hint="One note a month. Nothing else.">
            <Input id="footer-email" type="email" placeholder="you@example.com" />
          </Field>
          <Button type="submit" variant="secondary" className="self-start">
            Subscribe
          </Button>
        </form>
      </Container>
      <Container className="flex flex-col gap-2 border-t border-border py-6 sm:flex-row sm:justify-between">
        <span className="font-mono text-xs text-muted-foreground">© 2026 My Store</span>
        <span className="font-mono text-xs text-muted-foreground">Prices in USD</span>
      </Container>
    </footer>
  );
}
