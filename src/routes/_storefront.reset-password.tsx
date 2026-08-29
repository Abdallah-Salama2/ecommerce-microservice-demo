import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field } from "@/components/ui/field";
import { Container } from "@/components/storefront/section";
import { useAuthStore } from "@/store/auth";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const resetPasswordSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export const Route = createFileRoute("/_storefront/reset-password")({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      token: z.string().optional().parse(search.token),
    };
  },
  head: () => ({
    meta: [
      { title: "Reset Password — My Store" },
      { name: "description", content: "Set your new password" },
    ],
  }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const { token } = Route.useSearch();
  const navigate = useNavigate();
  const { resetPassword, isLoading, error, clearError } = useAuthStore();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!token) {
      toast.error("Invalid or missing reset token");
      return;
    }

    clearError();
    try {
      await resetPassword(token, data.password);
      toast.success("Password reset successfully! Please sign in with your new password.");
      navigate({ to: "/login" });
    } catch (err) {
      toast.error(error || "Failed to reset password. Please try again.");
    }
  };

  if (!token) {
    return (
      <Container className="py-20 sm:py-28">
        <div className="mx-auto max-w-md text-center">
          <h1 className="font-display text-4xl font-normal leading-[1.02] tracking-tight sm:text-5xl">
            Invalid reset link
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            This password reset link is invalid or has expired.
          </p>
          <Button asChild variant="primary" size="lg" className="mt-8">
            <Link to="/forgot-password">Request new reset link</Link>
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-20 sm:py-28">
      <div className="mx-auto max-w-md">
        <div className="text-center">
          <h1 className="font-display text-4xl font-normal leading-[1.02] tracking-tight sm:text-5xl">
            Set new password
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Enter your new password below
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-12 space-y-6">
          <Field label="New password" htmlFor="password" error={errors.password?.message}>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              {...register("password")}
            />
          </Field>

          <Field
            label="Confirm new password"
            htmlFor="confirmPassword"
            error={errors.confirmPassword?.message}
          >
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              {...register("confirmPassword")}
            />
          </Field>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            disabled={isLoading || isSubmitting}
          >
            {isLoading || isSubmitting ? "Resetting..." : "Reset password"}
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
