import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ShieldCheck, AlertTriangle, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field } from "@/components/ui/field";
import { useAuthStore, isAdmin } from "@/store/auth";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [
      { title: "Admin Login — My Store" },
      { name: "description", content: "Administrative access only" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminLoginPage,
});

function AdminLoginPage() {
  const navigate = useNavigate();
  const { login, logout, isLoading, clearError, user, isAuthenticated, isInitialized } = useAuthStore();
  const [accessDenied, setAccessDenied] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // If already authenticated as admin, redirect to /admin dashboard
  useEffect(() => {
    if (isInitialized && isAuthenticated && isAdmin(user)) {
      navigate({ to: "/admin" });
    }
  }, [isInitialized, isAuthenticated, user, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    clearError();
    setAccessDenied(false);
    try {
      await login(data);

      // After login, check if the user actually has the Admin role.
      // We read directly from the store snapshot (post-login state is
      // already committed before this line runs).
      const currentUser = useAuthStore.getState().user;
      const userIsAdmin = isAdmin(currentUser);

      if (!userIsAdmin) {
        // Not an admin — log them back out so we don't leave a
        // non-admin session lingering, then surface the denial message.
        await logout();
        setAccessDenied(true);
        return;
      }

      toast.success("Welcome to the admin panel.");
      navigate({ to: "/admin" });
    } catch (_err) {
      // Auth store already set the error; toast is enough feedback.
      const storeError = useAuthStore.getState().error;
      toast.error(storeError || "Login failed. Please check your credentials.");
    }
  };

  const busy = isLoading || isSubmitting;

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center px-4 py-16">
      {/* Centered card */}
      <div className="w-full max-w-sm">
        {/* Brand mark */}
        <div className="flex items-center gap-2.5 mb-10">
          <span className="flex h-8 w-8 items-center justify-center rounded-sm bg-primary text-primary-foreground">
            <ShieldCheck className="h-4 w-4" />
          </span>
          <span className="font-mono text-xs tracking-widest uppercase text-muted-foreground">
            My Store / Admin
          </span>
        </div>

        {/* Heading */}
        <h1 className="font-display text-3xl font-normal tracking-tight text-foreground">
          Sign in
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Administrative access only. This area is not for customers.
        </p>

        {/* Access denied banner */}
        {accessDenied && (
          <div
            role="alert"
            className="mt-6 flex items-start gap-3 rounded-sm border border-destructive/30 bg-destructive/8 px-4 py-3"
          >
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
            <div>
              <p className="text-sm font-medium text-destructive">Access denied</p>
              <p className="mt-0.5 text-xs text-destructive/80">
                Your account does not have administrator privileges.
              </p>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5" noValidate>
          <Field label="Email" htmlFor="admin-email">
            <Input
              id="admin-email"
              type="email"
              autoComplete="email"
              placeholder="admin@example.com"
              aria-invalid={!!errors.email}
              className={errors.email ? "border-destructive focus-visible:border-destructive" : ""}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email.message}</p>
            )}
          </Field>

          <Field label="Password" htmlFor="admin-password">
            <div className="relative">
              <Input
                id="admin-password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="••••••••"
                aria-invalid={!!errors.password}
                className={cn(
                  "pr-10",
                  errors.password ? "border-destructive focus-visible:border-destructive" : ""
                )}
                {...register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-destructive">{errors.password.message}</p>
            )}
          </Field>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="mt-2 w-full"
            disabled={busy}
          >
            {busy ? "Signing in…" : "Sign in to admin panel"}
          </Button>
        </form>

        {/* Footer note */}
        <p className="mt-8 text-center text-xs text-muted-foreground">
          Looking for the customer store?{" "}
          <Link to="/login" className="underline underline-offset-2 hover:text-foreground transition-colors">
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
}
