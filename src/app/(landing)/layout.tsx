import { Icons } from "@/components/icons";
import { UserLoginLink } from "@/components/user-login-link";
import { STRING_CONSTANTS } from "@/constants/stringConstants";
import Link from "next/link";

interface LandingLayoutProps {
  children: React.ReactNode;
}

export default async function LandingLayout({ children }: LandingLayoutProps) {
  return (
    <div className="mx-auto w-full px-4">
      <header className="mx-auto mb-12 flex max-w-[1440px] items-center justify-between py-4">
        <div className="flex gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <Icons.Logo />
            <span className="font-bold">{STRING_CONSTANTS.TITLE}</span>
          </Link>
        </div>
        <div>
          <UserLoginLink />
        </div>
      </header>
      <main className="flex max-h-screen min-h-full items-center justify-center">
        {children}
      </main>
    </div>
  );
}
