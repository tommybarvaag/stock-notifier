"use client";

import type { User } from "next-auth";
import { signOut } from "next-auth/react";

import { DropdownMenu } from "@/components/ui/dropdown";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { UserAvatar } from "./user-avatar";

interface UserAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {
  user: Pick<User, "name" | "image" | "email">;
}

export function UserAccountNav({ user, ...other }: UserAccountNavProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <DropdownMenu
      open={isOpen}
      onOpenChange={(openChange) => setIsOpen(openChange)}
    >
      <DropdownMenu.Trigger className="flex items-center gap-2 overflow-hidden rounded-md border bg-white p-2 px-4 hover:bg-slate-100 focus:ring-2 focus:ring-brand-900 focus:ring-offset-2 focus-visible:outline-none">
        <UserAvatar
          user={{
            name: user.name ?? "Du må legge til navn",
            image:
              user.image ??
              "https://miro.medium.com/max/640/1*W35QUSvGpcLuxPo3SRTH4w.png",
          }}
        />
        <div className="hidden flex-1 flex-col items-start lg:flex">
          {user.name && <p className="text-sm font-medium">{user.name}</p>}
        </div>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className="md:w-[240px]" align="start" {...other}>
          <div className="flex items-center justify-start gap-2 p-4">
            <div className="flex flex-col leading-none">
              {user.name && <p className="font-medium">{user.name}</p>}
              {user.email && (
                <p className="w-[200px] truncate text-sm text-slate-600">
                  {user.email}
                </p>
              )}
            </div>
          </div>
          <DropdownMenu.Separator />
          <DropdownMenu.Item>
            <Link href="/dashboard" className="w-full">
              Home
            </Link>
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            <Link href="/dashboard/notification" className="w-full">
              Notifications
            </Link>
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            <Link href="/dashboard/settings" className="w-full">
              Settings
            </Link>
          </DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item
            className="cursor-pointer"
            onSelect={(event) => {
              event.preventDefault();
              signOut({
                callbackUrl: `${window.location.origin}/login`,
              });
            }}
          >
            Sign out
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu>
  );
}
