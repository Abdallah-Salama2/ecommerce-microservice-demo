import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field } from "@/components/ui/field";
import { Container } from "@/components/storefront/section";
import { useAuthStore } from "@/store/auth";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export const Route = createFileRoute("/_storefront/forgot-password")({
  head: () => ({
    meta: [
      { title: "Forgot Password — My Store" },
      { name: "description", content: "Reset your password" },
    ],
  }),
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  const { forgotPassword, isLoading, error: authError, clearError } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    clearError();
    try {
      await forgotPassword(data.email);
      toast.success("If that email exists, a reset link has been sent");
    } catch (err) {
      toast.error(authError || "Failed to send reset email. Please try again.");
    }
  };

  return (
    <Container className="py-20 sm:py-28">
      <div className="mx-auto max-w-md">
        <div className="text-center">
          <h1 className="font-display text-4xl font-normal leading-[1.02] tracking-tight sm:text-5xl">
            Forgot password?
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-12 space-y-6">
          <Field label="Email" htmlFor="email" error={errors.email?.message}>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              {...register("email")}
            />
          </Field>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            disabled={isLoading || isSubmitting}
          >
            {isLoading || isSubmitting ? "Sending..." : "Send reset link"}
          </Button>
        </form>

        <div className="mt-8 text-center">
          <Link
            to="/login"
            className="rule-label text-sm transition-colors hover:text-foreground"
          >
            Back to sign in
          </Link>
        </div>
      </div>
    </Container>
  );
}
