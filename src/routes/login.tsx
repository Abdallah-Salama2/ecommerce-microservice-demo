import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field } from "@/components/ui/field";
import { Container } from "@/components/storefront/section";
import { useAuthStore } from "@/store/auth";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const Route = createFileRoute("/login")({
  beforeLoad: () => {
    // Redirect if already logged in
    if (useAuthStore.getState().isAuthenticated) {
      throw redirect({ to: "/" });
    }
  },
  head: () => ({
    meta: [
      { title: "Login — My Store" },
      { name: "description", content: "Sign in to your account" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { login, isLoading, error, clearError } = useAuthStore();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    clearError();
    try {
      await login(data);
      toast.success("Successfully logged in!");
      window.location.href = "/"; // Force redirect to refresh auth state
    } catch (err) {
      toast.error(error || "Login failed. Please try again.");
    }
  };

  return (
    <Container className="py-20 sm:py-28">
      <div className="mx-auto max-w-md">
        <div className="text-center">
          <h1 className="font-display text-4xl font-normal leading-[1.02] tracking-tight sm:text-5xl">
            Welcome back
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Sign in to your account to continue
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

          <Field label="Password" htmlFor="password" error={errors.password?.message}>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              {...register("password")}
            />
          </Field>

          <div className="flex items-center justify-between">
            <Link
              to="/forgot-password"
              className="rule-label text-sm transition-colors hover:text-foreground"
            >
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            disabled={isLoading || isSubmitting}
          >
            {isLoading || isSubmitting ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="rule-label transition-colors hover:text-foreground"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </Container>
  );
}
