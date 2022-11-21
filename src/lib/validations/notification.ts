import * as z from "zod";

export const notificationSchema = z.object({
  id: z.string().optional(),
  sku: z.string(),
  url: z.string(),
});
