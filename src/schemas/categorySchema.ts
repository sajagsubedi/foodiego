import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
  slug: z
    .string()
    .min(1, "Category slug is required")
    .regex(
      /^[a-z0-9-]+$/,
      "Slug can only contain lowercase letters, numbers, and hyphens"
    ),
  image: z
    .instanceof(File, {
      message: "Category Image is required",
    })
    .optional(),
});

export type CategoryInput = z.infer<typeof categorySchema>;
