import { db } from "@/lib/db";
import { cache } from "react";
import "server-only";

export const getNotificationById = cache(
  async (id: string, includeUser = true) => {
    const notification = await db.notification.findFirst({
      where: {
        id: id,
      },
      include: {
        user: includeUser,
      },
    });

    return notification;
  }
);
