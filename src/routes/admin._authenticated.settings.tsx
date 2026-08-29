import { createFileRoute } from "@tanstack/react-router";
import { Settings, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/admin/_authenticated/settings")({
  component: AdminSettingsPage,
});

function AdminSettingsPage() {
  return (
    <div className="space-y-8 p-6 lg:p-8">
      <div>
        <h1 className="font-display text-2xl font-normal tracking-tight text-foreground sm:text-3xl">
          Store Settings
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Configure store preferences, currency display, shipping rules, and security.
        </p>
      </div>

      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center p-12 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Settings className="h-6 w-6" />
          </div>
          <Badge variant="outline" className="mt-4 gap-1.5 whitespace-nowrap">
            <Clock className="h-3 w-3" />
            Backend Endpoint Pending
          </Badge>
          <h3 className="mt-4 font-display text-lg font-normal tracking-tight text-foreground">
            Store Settings Workstation Coming Soon
          </h3>
          <p className="mt-2 max-w-md text-sm text-muted-foreground leading-relaxed">
            The store configuration API is scheduled for the next backend release. Once active, store branding, payment gateway toggles, and notification settings will be manageable here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
