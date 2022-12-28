import { DashboardBranding } from "@/components/dashboard-branding";
import { DashboardNav } from "@/components/dashboard-nav";
import { UserAccountNav } from "@/components/user-account-nav";
import { authOptions } from "@/lib/auth";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions.pages?.signIn ?? "/");
  }

  return (
    <>
      <div className="flex min-h-screen overflow-hidden">
        <aside className="h-0 w-0 flex-col md:flex md:h-auto md:w-14 md:border-r md:border-slate-100 md:bg-slate-50 md:py-4 lg:w-56 lg:flex-shrink-0 lg:px-4">
          <div className="hidden flex-1 flex-col space-y-4 md:flex">
            <DashboardBranding />
            <DashboardNav />
          </div>
          <div className="absolute top-4 right-4 lg:relative lg:top-auto lg:right-auto">
            <UserAccountNav
              user={{
                name: user.name,
                image: user.image,
                email: user.email,
              }}
            />
          </div>
        </aside>
        <main className="flex w-0 flex-1 flex-col overflow-hidden px-4 py-10 lg:px-12">
          {children}
        </main>
      </div>
    </>
  );
}
