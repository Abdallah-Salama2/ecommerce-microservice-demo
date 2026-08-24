import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAuthStore } from "@/store/auth";

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export function ProtectedRoute({ children, redirectTo = "/login" }: ProtectedRouteProps) {
  const navigate = useNavigate();
  const { isAuthenticated, isInitialized } = useAuthStore();

  useEffect(() => {
    // Wait until the initial silent-refresh attempt (on app load) has
    // resolved before deciding to redirect. Without this check, a
    // logged-in user gets bounced to /login on every reload because
    // isAuthenticated is briefly false while the refresh call is in flight.
    if (isInitialized && !isAuthenticated) {
      navigate({ to: redirectTo, search: { redirect: window.location.pathname } });
    }
  }, [isAuthenticated, isInitialized, navigate, redirectTo]);

  if (!isInitialized) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  return <>{children}</>;
}