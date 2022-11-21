import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { cache } from "react";
import "server-only";

export const getUserById = cache(
  async (id: string, includeNotifications = true) => {
    const user = await db.user.findFirst({
      where: {
        id: id,
      },
      include: {
        notifications: includeNotifications,
      },
    });

    return user;
  }
);

export const preloadById = (id: string, includeRsvp = true) => {
  void getUserById(id, includeRsvp);
};

export const getUser = cache(async (includeRsvp = true) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return null;
  }

  const user = await getUserById(currentUser?.id, includeRsvp);

  return user;
});
