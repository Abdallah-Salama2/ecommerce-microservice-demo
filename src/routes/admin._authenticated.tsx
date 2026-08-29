import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Package,
  FolderTree,
  ShoppingCart,
  Users,
  Settings,
  LogOut,
  ShieldCheck,
  ChevronRight,
  Sun,
  Moon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth";
import { AdminRoute } from "@/components/auth/admin-route";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";

export const Route = createFileRoute("/admin/_authenticated")({
  component: AdminAuthenticatedLayout,
});

interface NavItem {
  to:
  | "/admin"
  | "/admin/products"
  | "/admin/categories"
  | "/admin/orders"
  | "/admin/customers"
  | "/admin/settings";
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  exact?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/products", label: "Products", icon: Package },
  { to: "/admin/categories", label: "Categories", icon: FolderTree },
  { to: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { to: "/admin/customers", label: "Customers", icon: Users },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

function AdminAuthenticatedLayout() {
  const { logout, user } = useAuthStore();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Fix hydration mismatch by only rendering theme-dependent UI after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  const isActive = (to: string, exact?: boolean) =>
    exact ? currentPath === to : currentPath.startsWith(to);

  return (
    <AdminRoute>
      <div className="flex min-h-screen bg-surface">
        {/* Sidebar */}
        <aside className="fixed inset-y-0 left-0 z-40 flex w-60 flex-col border-r border-border bg-card">
          {/* Brand */}
          <div className="flex h-16 items-center gap-2.5 border-b border-border px-5">
            <span className="flex h-7 w-7 items-center justify-center rounded-sm bg-primary text-primary-foreground">
              <ShieldCheck className="h-3.5 w-3.5" />
            </span>
            <div className="leading-none">
              <p className="text-sm font-medium text-foreground">My Store</p>
              <p className="rule-label mt-0.5">Admin Panel</p>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Admin navigation">
            <ul className="space-y-0.5">
              {NAV_ITEMS.map(({ to, label, icon: Icon, exact }) => {
                const active = isActive(to, exact);
                return (
                  <li key={to}>
                    <Link
                      to={to}
                      className={cn(
                        "flex items-center gap-3 rounded-sm px-3 py-2.5 text-sm font-medium transition-colors",
                        active
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-accent hover:text-foreground"
                      )}
                      aria-current={active ? "page" : undefined}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer: user info + logout */}
          <div className="border-t border-border p-3">
            <div className="mb-2 flex items-center gap-3 rounded-sm px-3 py-2">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-semibold text-primary">
                {user?.firstName?.[0] ?? "A"}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-foreground">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="truncate text-xs text-muted-foreground">{user?.email}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground"
              onClick={() => logout()}
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </Button>
          </div>
        </aside>

        {/* Main content area (offset by sidebar width) */}
        <main className="flex-1 pl-60 min-w-0">
          {/* Top bar */}
          <header className="sticky top-0 z-30 flex h-16 items-center gap-2 border-b border-border bg-card px-6">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5">
              <Link to="/admin" className="rule-label transition-colors hover:text-foreground">
                Admin
              </Link>
              {currentPath !== "/admin" && (
                <>
                  <ChevronRight className="h-3 w-3 text-muted-foreground" />
                  <span className="rule-label text-foreground capitalize">
                    {currentPath.split("/admin/")[1]?.split("/")[0] ?? ""}
                  </span>
                </>
              )}
            </nav>

            <div className="ml-auto flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                aria-label="Toggle theme"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {mounted ? (theme === "dark" ? <Sun /> : <Moon />) : <div className="h-5 w-5" />}
              </Button>
              <Link
                to="/"
                className="rule-label transition-colors hover:text-foreground"
                target="_blank"
                rel="noopener noreferrer"
              >
                View store ↗
              </Link>
            </div>
          </header>

          {/* Page content */}
          <div className="p-6 sm:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </AdminRoute>
  );
}
