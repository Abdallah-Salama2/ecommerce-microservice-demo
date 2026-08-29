import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAuthStore } from "@/store/auth";

interface AdminRouteProps {
  children: React.ReactNode;
}

/**
 * AdminRoute — guards any admin page.
 *
 * Unauthenticated users → /admin/login
 * Authenticated non-admins → /admin/login (they'll see the access-denied
 *   state if they try to log in again, or they can use the customer link)
 */
export function AdminRoute({ children }: AdminRouteProps) {
  const navigate = useNavigate();
  const { isAuthenticated, isInitialized, user } = useAuthStore();
  const isUserAdmin = user?.roles?.includes("Admin") ?? false;

  useEffect(() => {
    if (!isInitialized) return;

    if (!isAuthenticated || !isUserAdmin) {
      navigate({ to: "/admin/login" });
    }
  }, [isAuthenticated, isInitialized, navigate, isUserAdmin]);

  if (!isInitialized) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Loading…</p>
      </div>
    );
  }

  if (!isAuthenticated || !isUserAdmin) {
    return null; // Will redirect in useEffect
  }

  return <>{children}</>;
}