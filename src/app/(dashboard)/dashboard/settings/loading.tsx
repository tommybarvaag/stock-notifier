import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import { Card } from "@/components/ui/card";
import { STRING_CONSTANTS } from "@/constants/stringConstants";

export default function DashboardSettingsLoading() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading={STRING_CONSTANTS.HEADINGS.SETTINGS}
        text="Administrate your account"
      />
      <div className="grid gap-10">
        <Card.Skeleton />
      </div>
    </DashboardShell>
  );
}
