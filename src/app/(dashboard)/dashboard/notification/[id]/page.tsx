import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import { UserNotificationForm } from "@/components/user-notification-form";
import { getNotificationById } from "@/utils/notification-utils";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

interface NotificationPageProps {
  params: { notificationId: string };
}

export default async function NotificationPage({
  params,
}: NotificationPageProps) {
  const notification = await getNotificationById(params.notificationId);

  if (!notification) {
    notFound();
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Edit stock notification"
        text="Edit your entry"
      ></DashboardHeader>
      <UserNotificationForm
        user={{
          id: notification.user.id,
        }}
        notification={{
          id: notification.id,
          sku: notification.sku,
          url: notification.url,
        }}
      />
    </DashboardShell>
  );
}
