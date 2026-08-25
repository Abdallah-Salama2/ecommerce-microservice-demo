import { createFileRoute } from "@tanstack/react-router";
import { Container, SectionHeading } from "@/components/storefront/section";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — My Store" },
      {
        name: "description",
        content: "Learn about My Store - our mission, values, and commitment to quality products and customer satisfaction.",
      },
      { property: "og:title", content: "About Us — My Store" },
      {
        property: "og:description",
        content: "Discover our story and what drives us to provide the best products.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <Container className="py-14 sm:py-20">
      <header className="max-w-2xl">
        <span className="rule-label">About Us</span>
        <h1 className="mt-4 font-display text-4xl font-normal leading-[1.02] tracking-tight sm:text-6xl">
          Our Story
        </h1>
        <p className="mt-6 text-base leading-relaxed text-muted-foreground">
          Quality products, carefully selected for everyday life.
        </p>
      </header>

      <div className="mt-14 max-w-3xl space-y-12">
        <section>
          <h2 className="font-display text-2xl font-normal tracking-tight">Our Mission</h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            At My Store, we believe in curating products that stand the test of time. Every item in our collection is chosen for its quality, durability, and value. We're committed to providing our customers with products that enhance their daily lives.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-normal tracking-tight">What We Offer</h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            From electronics and books to beauty, toys, fitness, clothing, and home goods — we offer a carefully selected range of products across multiple categories. Our goal is to be your one-stop destination for quality items that meet your everyday needs.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-normal tracking-tight">Our Values</h2>
          <ul className="mt-4 space-y-3 text-base leading-relaxed text-muted-foreground">
            <li><strong>Quality First:</strong> We never compromise on quality. Every product is vetted for excellence.</li>
            <li><strong>Customer Satisfaction:</strong> Your happiness is our priority. We're here to help with any questions or concerns.</li>
            <li><strong>Sustainability:</strong> We strive to offer products that are environmentally responsible and built to last.</li>
            <li><strong>Transparency:</strong> We believe in honest pricing and clear communication about our products.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-2xl font-normal tracking-tight">Get in Touch</h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Have questions or feedback? We'd love to hear from you. Reach out to our customer service team, and we'll get back to you as soon as possible.
          </p>
        </section>
      </div>
    </Container>
  );
}
