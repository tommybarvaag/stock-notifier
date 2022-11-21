import { getSession } from "@/lib/session";
import type { NextApiRequest, NextApiResponse } from "next";
import * as z from "zod";

import { withAuthentication } from "@/lib/api-middleware/with-authentication";
import { withMethods } from "@/lib/api-middleware/with-methods";
import { db } from "@/lib/db";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const session = await getSession({ req });
      const user = session?.user;

      if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const dbUser = await db.user.findFirst({
        where: {
          id: user.id,
        },
      });

      return res.status(200).json(dbUser);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(422).json(error.issues);
      }

      return res.status(422).end();
    }
  }
}

export default withMethods(["GET"], withAuthentication(handler));
