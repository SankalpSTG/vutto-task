import z from "zod";

export const loginSchema = z.object({
  email: z.string().email("invalid email address"),
  password: z.string().min(6, "password must be at least 6 characters"),
});

export type LoginType = z.infer<typeof loginSchema>;