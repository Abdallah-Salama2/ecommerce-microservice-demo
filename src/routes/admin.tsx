import { createFileRoute } from '@tanstack/react-router';
import { AdminRoute } from '@/components/auth/admin-route';

export const Route = createFileRoute('/admin')({
  component: AdminDashboard,
});

function AdminDashboard() {
  return (
    <AdminRoute>
      <div className="container mx-auto px-4 py-12 md:py-24 max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Admin Dashboard
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Welcome to the secure administrative area.
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h3 className="text-lg font-medium text-foreground">Total Users</h3>
            <p className="mt-2 text-3xl font-semibold">1,248</p>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h3 className="text-lg font-medium text-foreground">Active Orders</h3>
            <p className="mt-2 text-3xl font-semibold">42</p>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h3 className="text-lg font-medium text-foreground">Revenue</h3>
            <p className="mt-2 text-3xl font-semibold">$12,450</p>
          </div>
        </div>
      </div>
    </AdminRoute>
  );
}