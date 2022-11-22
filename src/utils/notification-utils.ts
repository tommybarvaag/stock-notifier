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

const defaultGetNotificationsForUserIdOptions = {
  includeUser: true,
  showAlreadyNotified: false,
};

export const getNotificationsForUserId = cache(
  async (
    userId: string,
    options: Partial<
      typeof defaultGetNotificationsForUserIdOptions
    > = defaultGetNotificationsForUserIdOptions
  ) => {
    const mergedOptions = {
      ...defaultGetNotificationsForUserIdOptions,
      ...options,
    };

    const notification = await db.notification.findMany({
      where: {
        userId: userId,
        ...(mergedOptions.showAlreadyNotified ? {} : { notified: false }),
      },
      include: {
        user: mergedOptions.includeUser,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return notification;
  }
);
