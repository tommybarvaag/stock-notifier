import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import { Card } from "@/components/ui/card";

export default function DashboardSettingsLoading() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="RSVP"
        text="Meld deg og din familie på navnefesten til Helene og Ulrik."
      />
      <div className="grid gap-10">
        <Card.Skeleton />
      </div>
    </DashboardShell>
  );
}
