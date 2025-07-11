import {Request, Response} from "express"
import { BikeAdService } from "./bike-ad.service"
import { CreateBikeAdType } from "./types/create-bike-ad.type"
import { Responses } from "../../misc/responses"
import { GetBikeAdsType } from "./types/get-bike-ads.type"
import { CreateBikeImageUploadUrlType } from "./types/create-bike-image-upload-url.type"

const createAd = async (req: Request, res: Response) => {
    const response = await BikeAdService.createAd(req.user!.userId, req.body as CreateBikeAdType)
    res.status(200).json(Responses.successResponse(response))
}

const createBikeImageUploadUrl = async (req: Request, res: Response) => {
    const body = req.body as CreateBikeImageUploadUrlType
    const response = await BikeAdService.createBikeImageUploadUrl(req.user?.userId!, body.extension)
    res.status(200).json(Responses.successResponse(response))
}

const getAds = async (req: Request, res: Response) => {
    const response = await BikeAdService.getAds(req.user!.userId, req.body as GetBikeAdsType)
    res.status(200).json(Responses.successResponse(response))
}

const getUserAds = async (req: Request, res: Response) => {
    const response = await BikeAdService.getUserAds(req.user!.userId)
    res.status(200).json(Responses.successResponse(response))
}

const getAd = async (req: Request, res: Response) => {
    const response = await BikeAdService.getAd(req.params.id)
    res.status(200).json(Responses.successResponse(response))
}

const updateAd = async (req: Request, res: Response) => {
    const response = await BikeAdService.updateAd(req.user!.userId, req.params.id, req.body as CreateBikeAdType)
    res.status(200).json(Responses.successResponse(response))
}

const deleteAd = async (req: Request, res: Response) => {
    await BikeAdService.deleteAd(req.user!.userId, req.params.id)
    res.status(200).json(Responses.successResponse())
}

const getFilters = async (req: Request, res: Response) => {
    const filters = await BikeAdService.getFilters()
    res.status(200).json(Responses.successResponse(filters))
}

export const BikeAdController = {
    createAd,
    createBikeImageUploadUrl,
    getAds,
    getAd,
    getUserAds,
    updateAd,
    deleteAd,
    getFilters
}