import z from "zod";

export const createBikeAdSchema = z.object({
    title: z.string().min(5, "Title must be at least 5 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    brand: z.string().min(1, "Brand must be at least 1 characters"),
    model: z.string().min(1, "Model must be at least 1 characters"),
    manufacturingYear: z.number().positive("Manufacturing year must be a positive number").refine(val => val <= new Date().getFullYear(), {
        message: "Manufacturing year can't be in the future"
    }),
    kmsDriven: z.number().positive("KMS Driven must be a positive number").max(1000000, "KMS Driven seems unusually high"),
    price: z.number().positive("Price must be a positive number").max(10000000, "Price seems unusually high"),
    images: z.array(z.string().url("Each image must be a valid URL")).min(1, "At least one image is required"),
});

export type CreateBikeAdType = z.infer<typeof createBikeAdSchema>;