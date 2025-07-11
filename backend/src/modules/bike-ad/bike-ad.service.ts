import mongoose from "mongoose"
import { BikeAdModel } from "../../schemas/bike-ad.schema"
import { CreateBikeAdType } from "./types/create-bike-ad.type"
import { NotFoundException } from "../../misc/errors"
import { GetBikeAdsType } from "./types/get-bike-ads.type"
import { S3Service } from "../aws/s3.service"
import { FileMimeTypes, S3_BUCKETS } from "../aws/constants"

const createAd = async (userId: string, data: CreateBikeAdType) => {
    return await BikeAdModel.create({...data, userId: new mongoose.Types.ObjectId(userId)})
}

const createBikeImageUploadUrl = async (userId: string, extension: string) => {
    const contentType = (FileMimeTypes as any)[extension]
    const key = `${userId}/${new Date().getTime()}_${Math.round(Math.random() * 1000)}.${extension}`
    const preSignedUrl = await S3Service.createPresignedUrl(key, S3_BUCKETS.VuttoBikeImages, contentType)
    const publicUrl = S3Service.getPublicUrl(key, S3_BUCKETS.VuttoBikeImages)
    return {
        preSignedUrl,
        publicUrl
    }
}

const getUserAds = async (userId: string) => {
    return await BikeAdModel.find({userId: new mongoose.Types.ObjectId(userId), isActive: true})
}

const getAds = async (userId: string, data: GetBikeAdsType) => {
    console.log(data)
    const query: any = {
        isActive: true,
        userId: {
            $ne: new mongoose.Types.ObjectId(userId)
        }
    }
    if(data.brand.length > 0){
        query.brand = data.brand
    }
    if(data.model.length > 0){
        query.model = data.model
    }
    const response = await BikeAdModel.find(query).limit(100).lean()
    return response.map(ad => ({
        _id: ad._id,
        title: ad.title,
        description: ad.description,
        brand: ad.brand,
        model: ad.model,
        manufacturingYear: ad.manufacturingYear,
        kmsDriven: ad.kmsDriven,
        price: ad.price,
        images: ad.images,
        createdAt: ad.createdAt,
    }))
}

const updateAd = async (userId: string, bikeId: string, data: Partial<CreateBikeAdType>) => {
    const bikeAd = await BikeAdModel.findOne({
        userId: new mongoose.Types.ObjectId(userId),
        _id: new mongoose.Types.ObjectId(bikeId)
    })
    if(!bikeAd) throw new NotFoundException("Bike Ad not found")
    
    return await BikeAdModel.findOneAndUpdate({
        userId: new mongoose.Types.ObjectId(userId),
        _id: new mongoose.Types.ObjectId(bikeId)
    }, {
        $set: {
            ...data
        }
    }, {new: true})
}

const getAd = async (bikeId: string) => {
    const bikeAd = await BikeAdModel.findOne({
        _id: new mongoose.Types.ObjectId(bikeId)
    })
    if(!bikeAd) throw new NotFoundException("Bike Ad not found")
    return bikeAd
}

const deleteAd = async (userId: string, bikeId: string) => {
    return await BikeAdModel.deleteOne({
        userId: new mongoose.Types.ObjectId(userId),
        _id: new mongoose.Types.ObjectId(bikeId)
    })
}

const getFilters = async () => {
    const brands = await BikeAdModel.distinct("brand")
    const models = await BikeAdModel.distinct("model")
    return {
        brands,
        models
    }
}

export const BikeAdService = {
    createAd,
    createBikeImageUploadUrl,
    updateAd,
    deleteAd,
    getAd,
    getAds,
    getUserAds,
    getFilters
}