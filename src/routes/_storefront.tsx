import { createFileRoute, Outlet } from "@tanstack/react-router";
import { SiteHeader } from "@/components/storefront/site-header";
import { SiteFooter } from "@/components/storefront/site-footer";

export const Route = createFileRoute("/_storefront")({
  component: StorefrontLayout,
});

function StorefrontLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}
