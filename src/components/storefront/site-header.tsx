import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Search, ShoppingBag, Menu, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Drawer } from "@/components/ui/panel";
import { Container } from "@/components/storefront/section";
import { MiniCartContents, MiniCartFooter } from "@/components/storefront/mini-cart";
import { useAuthStore } from "@/store/auth";

const nav = [
  { to: "/shop", label: "Shop all" },
  { to: "/shop", label: "Electronics" },
  { to: "/shop", label: "Books" },
  { to: "/shop", label: "Home" },
];

export function SiteHeader() {
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuthStore();

  // FIX: Make admin check reactive by deriving it directly from the reactive 'user' state
  const isUserAdmin = user?.roles?.includes('Admin') || false;

  const handleLogout = async () => {
    await logout();
    navigate({ to: "/" });
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-6 sm:h-20">
        <Link
          to="/"
          className="font-display text-xl tracking-tight focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary sm:text-2xl"
        >
          My&nbsp;Store
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="rule-label transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" aria-label="Search">
            <Search />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Open cart" onClick={() => setCartOpen(true)}>
            <ShoppingBag />
          </Button>

          {isAuthenticated ? (
            <>
              {isUserAdmin && (
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Admin dashboard"
                  onClick={() => navigate({ to: "/admin" })}
                >
                  <User />
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon"
                aria-label="Logout"
                onClick={handleLogout}
              >
                <LogOut />
              </Button>
            </>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              aria-label="Login"
              onClick={() => navigate({ to: "/login" })}
            >
              <User />
            </Button>
          )}

          <Button
            variant="ghost"
            size="icon"
            aria-label="Open menu"
            className="md:hidden"
            onClick={() => setMenuOpen(true)}
          >
            <Menu />
          </Button>
        </div>
      </Container>

      <Drawer
        open={cartOpen}
        onOpenChange={setCartOpen}
        title="Your bag"
        description="Two items held for 30 minutes."
        footer={<MiniCartFooter />}
      >
        <MiniCartContents />
      </Drawer>

      <Drawer open={menuOpen} onOpenChange={setMenuOpen} title="Menu">
        <nav aria-label="Mobile" className="flex flex-col">
          {nav.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              onClick={() => setMenuOpen(false)}
              className="border-b border-border py-4 font-display text-2xl tracking-tight transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
          <div className="border-t border-border py-4">
            {isAuthenticated ? (
              <>
                <p className="rule-label mb-4">Signed in as {user?.firstName}</p>
                {isUserAdmin && (
                  <Link
                    to="/admin"
                    onClick={() => setMenuOpen(false)}
                    className="block py-2 font-display text-xl tracking-tight transition-colors hover:text-primary"
                  >
                    Admin Dashboard
                  </Link>
                )}
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="block py-2 font-display text-xl tracking-tight transition-colors hover:text-primary text-left"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="block py-2 font-display text-xl tracking-tight transition-colors hover:text-primary"
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="block py-2 font-display text-xl tracking-tight transition-colors hover:text-primary"
                >
                  Create account
                </Link>
              </>
            )}
          </div>
        </nav>
      </Drawer>
    </header>
  );
}