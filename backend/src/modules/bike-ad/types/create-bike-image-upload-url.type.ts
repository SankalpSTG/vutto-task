import z from "zod";

export const createBikeImageUploadUrlSchema = z.object({
    extension: z.enum(["png", "jpg", "jpeg"], {
        required_error: "File extension is required",
        invalid_type_error: "Extension must be one of: png, jpg, jpeg",
    }),
});

export type CreateBikeImageUploadUrlType = z.infer<typeof createBikeImageUploadUrlSchema>;