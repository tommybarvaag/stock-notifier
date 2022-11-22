import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import { UserNotificationForm } from "@/components/user-notification-form";
import { authOptions } from "@/lib/auth";
import { getUser } from "@/utils/userUtils";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function NewNotificationPage() {
  const user = await getUser();

  if (!user) {
    redirect(authOptions.pages?.signIn ?? "/");
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Create new stock notification"
        text="Only power.no is supported at the moment..."
      ></DashboardHeader>
      <UserNotificationForm
        user={{
          id: user.id,
        }}
      />
    </DashboardShell>
  );
}
