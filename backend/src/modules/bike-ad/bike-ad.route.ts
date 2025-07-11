import { Router } from "express";
import { validate } from "../../middlewares/validator.middleware";
import { AuthMiddleware } from "../../middlewares/auth.middleware";
import { getBikeAdsSchema } from "./types/get-bike-ads.type";
import { BikeAdController } from "./bike-ad.controller";
import { createBikeAdSchema } from "./types/create-bike-ad.type";
import { createBikeImageUploadUrlSchema } from "./types/create-bike-image-upload-url.type";

const BikeAdRouter = Router()

BikeAdRouter.post("/image/url", AuthMiddleware(), validate(createBikeImageUploadUrlSchema), BikeAdController.createBikeImageUploadUrl)
BikeAdRouter.get("/user", AuthMiddleware(), BikeAdController.getUserAds)
BikeAdRouter.get("/:id", AuthMiddleware(), BikeAdController.getAd)
BikeAdRouter.delete("/:id", AuthMiddleware(), BikeAdController.deleteAd)
BikeAdRouter.get("/", AuthMiddleware(), validate(getBikeAdsSchema, true), BikeAdController.getAds)
BikeAdRouter.post("/", AuthMiddleware(), validate(createBikeAdSchema), BikeAdController.createAd)
BikeAdRouter.put("/:id", AuthMiddleware(), validate(createBikeAdSchema), BikeAdController.updateAd)

export default BikeAdRouter