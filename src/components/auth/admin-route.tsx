import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAuthStore } from "@/store/auth"; // Removed the non-reactive isAdmin import

interface AdminRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export function AdminRoute({ children, redirectTo = "/" }: AdminRouteProps) {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, user } = useAuthStore();

  // FIX: Derive admin status reactively from the user state
  const isUserAdmin = user?.roles?.includes('Admin') || false;

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        navigate({ to: "/login", search: { redirect: window.location.pathname } });
      } else if (!isUserAdmin) {
        navigate({ to: redirectTo });
      }
    }
  }, [isAuthenticated, isLoading, navigate, redirectTo, isUserAdmin]);

  if (isLoading) {
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