import { getSession } from "@/lib/session";
import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

export function withAuthentication(handler: NextApiHandler) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession({ req });

    if (!session) {
      return res.status(403).end();
    }

    return handler(req, res);
  };
}
