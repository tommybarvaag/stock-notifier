import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import { Icons } from "@/components/icons";
import { authOptions } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { getUser } from "@/utils/userUtils";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const user = await getUser();

  if (!user) {
    redirect(authOptions.pages?.signIn ?? "/");
  }

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
      {user?.notifications?.length === 0 ? (
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
        user?.notifications
          ?.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
          ?.map((notification) => (
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
                    alt="Speaker"
                    src="https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80"
                    className="h-14 w-14 rounded-lg object-cover"
                  />
                </a>

                <div className="ml-4">
                  <h3 className="font-medium sm:text-lg">
                    <a
                      href={`/dashboard/notification/${notification.id}`}
                      className="hover:underline"
                    >
                      {`Product sku: ${notification.sku}`}
                    </a>
                  </h3>
                  <p className="text-sm text-gray-700 line-clamp-2">
                    {notification.url}
                  </p>
                  <div className="mt-2 sm:flex sm:items-center sm:gap-2">
                    <div className="flex items-center text-gray-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                        />
                      </svg>
                      <p className="ml-1 text-xs">14 comments</p>
                    </div>

                    <span className="hidden sm:block" aria-hidden="true">
                      &middot;
                    </span>

                    <p className="hidden sm:block sm:text-xs sm:text-gray-500">
                      Posted by
                      <a
                        href={`/dashboard/notification/${notification.id}`}
                        className="font-medium underline hover:text-gray-700"
                      >
                        John
                      </a>
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
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
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
