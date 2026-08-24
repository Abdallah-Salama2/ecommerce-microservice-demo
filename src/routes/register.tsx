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

const registerSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export const Route = createFileRoute("/register")({
  beforeLoad: () => {
    // Redirect if already logged in
    if (useAuthStore.getState().isAuthenticated) {
      throw redirect({ to: "/" });
    }
  },
  head: () => ({
    meta: [
      { title: "Register — My Store" },
      { name: "description", content: "Create a new account" },
    ],
  }),
  component: RegisterPage,
});

function RegisterPage() {
  const { register: registerUser, isLoading, error, clearError } = useAuthStore();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    clearError();
    try {
      await registerUser({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      });
      toast.success("Account created successfully! Please sign in.");
      window.location.href = "/login";
    } catch (err) {
      toast.error(error || "Registration failed. Please try again.");
    }
  };

  return (
    <Container className="py-20 sm:py-28">
      <div className="mx-auto max-w-md">
        <div className="text-center">
          <h1 className="font-display text-4xl font-normal leading-[1.02] tracking-tight sm:text-5xl">
            Create account
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Join us to start shopping
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-12 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <Field label="First name" htmlFor="firstName" error={errors.firstName?.message}>
              <Input
                id="firstName"
                type="text"
                placeholder="John"
                {...register("firstName")}
              />
            </Field>

            <Field label="Last name" htmlFor="lastName" error={errors.lastName?.message}>
              <Input
                id="lastName"
                type="text"
                placeholder="Doe"
                {...register("lastName")}
              />
            </Field>
          </div>

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

          <Field
            label="Confirm password"
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
            {isLoading || isSubmitting ? "Creating account..." : "Create account"}
          </Button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              to="/login"
              className="rule-label transition-colors hover:text-foreground"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </Container>
  );
}
