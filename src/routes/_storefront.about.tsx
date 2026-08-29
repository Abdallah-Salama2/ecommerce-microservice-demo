import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Container, SectionHeading } from "@/components/storefront/section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { toast } from "sonner";

export const Route = createFileRoute("/_storefront/about")({
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

const faqItems = [
  {
    question: "How long does shipping take?",
    answer:
      "Standard shipping takes 5–7 business days. Express shipping is 2–3 business days, and next-day delivery is available for select areas. Orders over $200 qualify for free standard shipping.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We accept returns within 30 days of delivery. Items must be in their original condition — unused, unworn, and with all tags attached. Visit our Returns & Refunds page for full details.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Yes, we ship to select international destinations. International delivery typically takes 7–14 business days. Please note that customs duties and import taxes may apply and are the customer's responsibility.",
  },
  {
    question: "How can I track my order?",
    answer:
      "Once your order ships, you'll receive a confirmation email with a tracking number. You can also track your order from your account dashboard under 'Your orders'.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit and debit cards, including Visa, Mastercard, and American Express. Additional payment options are displayed at checkout.",
  },
  {
    question: "How do I create an account?",
    answer:
      "Click the user icon in the top navigation bar and select 'Create account'. You'll need to provide your name, email address, and a secure password. Once registered, you can track orders, save addresses, and manage your wishlist.",
  },
];

function AboutPage() {
  /* Contact form — UI-only, no submission endpoint */
  // TODO: Connect to backend contact form endpoint when available
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    // TODO: Replace with actual API call when backend endpoint is available
    toast.success("Thank you for your message! We'll get back to you soon.");
    setContactForm({ name: "", email: "", subject: "", message: "" });
  };

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

        {/* FAQ Section */}
        <section>
          <SectionHeading
            eyebrow="Support"
            title="Frequently asked questions"
          />
          <Accordion type="single" collapsible className="mt-8">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`faq-${index}`}>
                <AccordionTrigger className="text-left font-medium">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* Contact Form — UI only, no submission endpoint */}
        <section id="contact">
          <SectionHeading
            eyebrow="Reach out"
            title="Get in touch"
          />
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            Have questions, feedback, or need help with an order? Fill out the
            form below, and our team will get back to you within 1–2 business
            days.
          </p>
          <form
            onSubmit={handleContactSubmit}
            className="mt-8 space-y-6"
            aria-label="Contact form"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="Name" htmlFor="contact-name">
                <Input
                  id="contact-name"
                  type="text"
                  placeholder="Your name"
                  value={contactForm.name}
                  onChange={(e) =>
                    setContactForm((prev) => ({ ...prev, name: e.target.value }))
                  }
                  required
                />
              </Field>
              <Field label="Email" htmlFor="contact-email">
                <Input
                  id="contact-email"
                  type="email"
                  placeholder="you@example.com"
                  value={contactForm.email}
                  onChange={(e) =>
                    setContactForm((prev) => ({ ...prev, email: e.target.value }))
                  }
                  required
                />
              </Field>
            </div>
            <Field label="Subject" htmlFor="contact-subject">
              <Input
                id="contact-subject"
                type="text"
                placeholder="What can we help with?"
                value={contactForm.subject}
                onChange={(e) =>
                  setContactForm((prev) => ({
                    ...prev,
                    subject: e.target.value,
                  }))
                }
                required
              />
            </Field>
            <Field label="Message" htmlFor="contact-message">
              <Textarea
                id="contact-message"
                placeholder="Tell us more…"
                rows={5}
                value={contactForm.message}
                onChange={(e) =>
                  setContactForm((prev) => ({
                    ...prev,
                    message: e.target.value,
                  }))
                }
                required
              />
            </Field>
            {/* TODO: Connect to backend endpoint when available — currently UI-only */}
            <Button type="submit" variant="primary" size="lg">
              Send message
            </Button>
          </form>
        </section>
      </div>
    </Container>
  );
}
