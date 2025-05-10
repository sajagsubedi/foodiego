import { z } from "zod";

export const foodSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.string(),
  markedPrice: z.string().optional(),
  image: z
    .instanceof(File, {
      message: "Food Image is required",
    })
    .optional(),
  categorySlug: z.string(),
  visibility: z.boolean(),
  isFeatured: z.boolean(),
});

export type FoodSchemaType = z.infer<typeof foodSchema>;
