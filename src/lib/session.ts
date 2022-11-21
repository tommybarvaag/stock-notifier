import { unstable_getServerSession } from "next-auth/next";
import type { GetSessionParams } from "next-auth/react";
import { getSession as nextAuthGetSession } from "next-auth/react";
import { authOptions } from "./auth";

export async function getSession(params?: GetSessionParams) {
  return params
    ? await nextAuthGetSession(params)
    : await unstable_getServerSession(authOptions);
}

export async function getCurrentUser() {
  const session = await getSession();

  return session?.user;
}
