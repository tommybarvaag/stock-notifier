import { getSession } from "@/lib/session";
import type { NextApiRequest, NextApiResponse } from "next";
import * as z from "zod";

import { withAuthentication } from "@/lib/api-middleware/with-authentication";
import { withMethods } from "@/lib/api-middleware/with-methods";
import { withUser } from "@/lib/api-middleware/with-user";
import { db } from "@/lib/db";
import { checkPowerStock } from "@/lib/stock-vendors/power-check-stock";
import { notificationSchema } from "@/lib/validations/notification";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "PATCH") {
    try {
      const session = await getSession({ req });
      const user = session?.user;

      if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const body = JSON.parse(req.body);

      const payload = notificationSchema.parse(body);

      const stock = await checkPowerStock(payload.sku);

      if (payload.id) {
        await db.notification.update({
          where: {
            id: payload.id,
          },
          data: {
            url: payload.url,
            sku: payload.sku,
            imageUrl: stock?.primaryImage2,
            title: stock?.title,
            description: stock?.shortDescription,
          },
        });
      } else {
        await db.notification.create({
          data: {
            sku: payload.sku,
            url: payload.url,
            userId: user.id,
            type: "price-drop",
            imageUrl: stock?.primaryImage2,
            title: stock?.title,
            description: stock?.shortDescription,
          },
        });
      }

      return res.end();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(422).json(error.issues);
      }

      return res.status(422).end();
    }
  }
}

export default withMethods(["PATCH"], withAuthentication(withUser(handler)));
