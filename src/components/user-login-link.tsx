"use client";

import fetcher from "@/lib/fetcher";
import type { Session } from "next-auth";
import Link from "next/link";
import useSWR from "swr";
import { Icons } from "./icons";

type UserLoginLinkProps = React.HTMLAttributes<HTMLAnchorElement>;

export function UserLoginLink({ ...other }: UserLoginLinkProps) {
  const { data, error } = useSWR<Session>("/api/user/session", fetcher);

  return !data && !error ? null : data?.user ? (
    <Link
      href="/dashboard"
      className="flex items-center gap-1 hover:underline"
      {...other}
    >
      Dashboard
      <Icons.ArrowRight className="h-4 w-4" />
    </Link>
  ) : (
    <Link
      href="/login"
      className="flex items-center gap-1 hover:underline"
      {...other}
    >
      Logg inn
      <Icons.ArrowRight className="h-4 w-4" />
    </Link>
  );
}
