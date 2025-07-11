import { NextFunction, Request, Response } from "express";
import z from "zod";
import { BadRequestException } from "../misc/errors";

export const validate = (schema: z.ZodSchema<any>, query?: boolean) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(query? req.query || {}:req.body || {});
    if (!result.success) {
      throw new BadRequestException("invalid request", result.error.issues)
    }
    req.body = result.data;
    next();
  };
};