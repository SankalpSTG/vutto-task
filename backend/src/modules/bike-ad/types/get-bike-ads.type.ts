import z from "zod";

export const getBikeAdsSchema = z.object({
  brand: z.preprocess((val) => typeof val === "string" ? val : undefined, z.string().default("")),
  model: z.preprocess((val) => typeof val === "string" ? val : undefined, z.string().default("")),
  manufacturingYear: z.preprocess(
    (val) => {
      const num = Number(val);
      return isNaN(num) ? undefined : num;
    },
    z.number().default(0)
  ),
  kmsDriven: z.preprocess(
    (val) => {
      const num = Number(val);
      return isNaN(num) ? undefined : num;
    },
    z.number().default(0)
  ),
});


export type GetBikeAdsType = z.infer<typeof getBikeAdsSchema>;
