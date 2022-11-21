"use client";

import type { Icon } from "@/components/icons";
import { Icons } from "@/components/icons";
import { STRING_CONSTANTS } from "@/constants/stringConstants";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export type NavigationItem = {
  title: string;
  href: string;
  disabled?: boolean;
  icon: Icon;
};

export const navigationItems: NavigationItem[] = [
  {
    title: "Hjem",
    href: "/dashboard",
    icon: Icons.LayoutDashboard,
  },
  {
    title: "Notifications",
    href: "/dashboard/notification",
    icon: Icons.BellRing,
  },
  {
    title: STRING_CONSTANTS.HEADINGS.SETTINGS,
    href: "/dashboard/settings",
    icon: Icons.Settings,
  },
];

export function DashboardNav() {
  const path = usePathname();

  return (
    <nav className="grid items-start gap-1">
      {navigationItems.map((navigationItem, index) => {
        const isActive =
          path === navigationItem.href ||
          (navigationItem.href !== "/dashboard" &&
            (path ?? "")?.startsWith(navigationItem.href));

        return (
          <Link
            key={index}
            href={navigationItem.disabled ? "/" : navigationItem.href}
          >
            <span
              className={clsx(
                "group flex items-center rounded-md px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100",
                isActive ? "bg-slate-200" : "transparent",
                navigationItem.disabled && "cursor-not-allowed opacity-50"
              )}
            >
              <navigationItem.icon className="mr-2 h-4 w-4" />
              <span>{navigationItem.title}</span>
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
