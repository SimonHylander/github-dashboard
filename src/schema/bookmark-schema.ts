import z from "zod";

export const bookmarkSchema = z.object({
  name: z.string().min(1).max(255),
});
