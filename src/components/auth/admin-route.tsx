import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAuthStore } from "@/store/auth";

interface AdminRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export function AdminRoute({ children, redirectTo = "/" }: AdminRouteProps) {
  const navigate = useNavigate();
  const { isAuthenticated, isInitialized, user } = useAuthStore();

  // Derive admin status reactively from the user state
  const isUserAdmin = user?.roles?.includes("Admin") || false;

  useEffect(() => {
    // Wait for the initial silent-refresh attempt to resolve before
    // deciding to redirect (same reasoning as ProtectedRoute).
    if (!isInitialized) return;

    if (!isAuthenticated) {
      navigate({ to: "/login", search: { redirect: window.location.pathname } });
    } else if (!isUserAdmin) {
      navigate({ to: redirectTo });
    }
  }, [isAuthenticated, isInitialized, navigate, redirectTo, isUserAdmin]);

  if (!isInitialized) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated || !isUserAdmin) {
    return null; // Will redirect in useEffect
  }

  return <>{children}</>;
}