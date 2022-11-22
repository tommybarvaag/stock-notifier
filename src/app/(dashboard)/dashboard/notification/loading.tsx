import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import { Card } from "@/components/ui/card";

export default function DashboardSettingsLoading() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Notifications"
        text="Your saved notifications will be listed here"
      />
      <div className="grid gap-10">
        <Card.Skeleton />
      </div>
    </DashboardShell>
  );
}
