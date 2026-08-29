import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/_authenticated/products")({
  component: AdminProductsOutlet,
});

function AdminProductsOutlet() {
  return <Outlet />;
}
