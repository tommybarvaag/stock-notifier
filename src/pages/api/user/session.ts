import type { NextApiRequest, NextApiResponse } from "next";
import * as z from "zod";

import { withMethods } from "@/lib/api-middleware/with-methods";
import { authOptions } from "@/lib/auth";
import { unstable_getServerSession } from "next-auth/next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const session = await unstable_getServerSession(req, res, authOptions);

      if (!session) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      return res.status(200).json(session);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(422).json(error.issues);
      }

      return res.status(422).end();
    }
  }
}

export default withMethods(["GET"], handler);
