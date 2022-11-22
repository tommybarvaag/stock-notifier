import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import { Icons } from "@/components/icons";
import NotificationShowAlreadyNotified from "@/components/notification-show-already-notified";
import { authOptions } from "@/lib/auth";
import { getCurrentUser } from "@/lib/session";
import { cn, formatDate } from "@/lib/utils";
import { getNotificationsForUserId } from "@/utils/notification-utils";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

// workaround for type error: The exported page component isn't correctly typed.
// Expected "{ searchParams: any; }", got "PageProps".
export default async function NotificationsPage(props: any) {
  const { searchParams } = props;
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions.pages?.signIn ?? "/");
  }

  const notifications = await getNotificationsForUserId(user.id, {
    showAlreadyNotified: searchParams?.showAlreadyNotified === "true" ?? false,
  });

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Notifications"
        text="Your saved notifications will be listed here"
      >
        <a
          type="button"
          href="/dashboard/notification/new"
          className={cn(
            "relative inline-flex h-9 items-center rounded-md border border-transparent bg-brand-500 px-4 py-2 font-medium text-white hover:bg-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
          )}
        >
          <span>New</span>
        </a>
      </DashboardHeader>
      <NotificationShowAlreadyNotified />
      {notifications?.length === 0 ? (
        <div className="flex w-full flex-col items-center justify-center gap-8">
          <div className="flex gap-2">
            <h2>No notifications yet</h2>
            <Icons.Frown />
          </div>
          <a
            type="button"
            href="/dashboard/notification/new"
            className={cn(
              "relative inline-flex h-24 items-center rounded-md border border-transparent bg-brand-500 px-12 py-2 font-medium text-white hover:bg-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
            )}
          >
            <span>Create new!</span>
          </a>
        </div>
      ) : (
        notifications?.map((notification) => (
          <article
            key={notification.id}
            className="rounded-xl border-2 border-gray-100 bg-white"
          >
            <div className="flex items-start p-6">
              <a
                href={`/dashboard/notification/${notification.id}`}
                className="block shrink-0"
              >
                <img
                  alt="Product notification image"
                  src={
                    notification.imageUrl ??
                    "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80"
                  }
                  className="h-14 w-14 rounded-lg object-cover"
                />
              </a>

              <div className="ml-4">
                <h3 className="font-medium sm:text-lg">
                  <a
                    href={`/dashboard/notification/${notification.id}`}
                    className="hover:underline"
                  >
                    {notification.title}
                  </a>
                </h3>
                <p className="text-sm text-gray-700 line-clamp-2">
                  {notification.description}
                </p>
                <div className="mt-2 sm:flex sm:items-center sm:gap-2">
                  <a
                    className="flex items-center font-medium underline hover:text-gray-700"
                    href={notification.url}
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                  >
                    <Icons.Link className="h-4 w-4" />
                    <p className="ml-1 text-xs">Store url</p>
                  </a>

                  <span className="hidden sm:block" aria-hidden="true">
                    &middot;
                  </span>
                  <p className="hidden sm:block sm:text-xs sm:text-gray-500">
                    Created{" "}
                    <time
                      dateTime={formatDate(
                        notification.createdAt.toISOString()
                      )}
                    >
                      {formatDate(notification.createdAt.toISOString())}
                    </time>
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <strong
                className={cn(
                  "-mr-[2px] -mb-[2px] inline-flex items-center gap-1 rounded-tl-xl rounded-br-xl py-1.5 px-3 text-white",
                  {
                    "bg-green-600": notification.notified,
                    "bg-red-600": !notification.notified,
                  }
                )}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>

                <span className="text-[10px] font-medium sm:text-xs">
                  {notification.notified ? "Sent!" : "Not sent"}
                </span>
              </strong>
            </div>
          </article>
        ))
      )}
    </DashboardShell>
  );
}
