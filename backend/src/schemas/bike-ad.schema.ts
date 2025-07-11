import mongoose from "mongoose"
import { COLLECTIONS } from "../constants/collections"

export const BikeAdSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    manufacturingYear: {
        type: Number,
        required: true
    },
    kmsDriven: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    images: {
        type: [String],
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    createdAt: {
        type: Date,
        default: () => new Date()
    },
    updatedAt: {
        type: Date,
        default: () => new Date()
    }
}, {
    collection: COLLECTIONS.bikeAd
})

export const BikeAdModel = mongoose.model(COLLECTIONS.bikeAd, BikeAdSchema)