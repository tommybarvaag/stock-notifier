import * as z from "zod";

export const imageSchema = z.object({
  createdAt: z.string(),
  updatedAt: z.string(),
  name: z.string(),
  url: z.string(),
  sanityId: z.string(),
  uploadId: z.string(),
  mimeType: z.string(),
  extension: z.string(),
});
