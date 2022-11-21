import type { NextApiRequest, NextApiResponse } from "next";
import * as z from "zod";

import { withMethods } from "@/lib/api-middleware/with-methods";
import { checkPowerStock } from "@/lib/check-stock";
import { db } from "@/lib/db";
import sendgridMail from "@/lib/sendgrid";
import { getNotificationEmailTemplate } from "@/utils/notification-email";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const notifications = await db.notification.findMany({
        include: {
          user: true,
        },
      });

      return res.status(200).json(notifications);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(422).json(error.issues);
      }

      return res.status(422).end();
    }
  }

  if (req.method === "POST") {
    const notifications = await db.notification.findMany({
      where: {
        notified: false,
      },
      include: {
        user: true,
      },
    });

    // async for loop
    for (let i = 0; i < notifications.length; i++) {
      const notification = notifications[i];

      if (!notification) {
        continue;
      }

      const stock = await checkPowerStock(notification.sku);
      if (notification.user?.email && stock && stock.stockCount > 0) {
        // Send notification
        const sendMailResponse = await sendgridMail.send({
          to: notification.user.email,
          from: "post@tommylb.com",
          subject: `Stock notification for ${stock.title}`,
          html: getNotificationEmailTemplate(
            notification.user.name ?? "Ukjent",
            stock.title,
            `https://www.power.no${stock.url}`
          ),
        });

        // Log notification sent
        if (sendMailResponse?.[0]?.statusCode === 202) {
          console.info("Notification sent");
          await db.notification.update({
            data: {
              notified: true,
              notifiedAt: new Date(),
            },
            where: {
              id: notification.id,
            },
          });
        }
      }
    }

    return res.status(200).end();
  }
}

export default withMethods(["GET", "POST"], handler);
