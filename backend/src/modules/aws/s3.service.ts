import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { randomUUID } from "crypto"
import { FileMimeTypes } from "./constants"

const s3 = new S3Client({
    region: process.env.AWS_REGION!
})

const createPresignedUrl = async (key: string, bucket: string, contentType: string) => {
    const command = new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        ContentType: contentType,
    })

    const url = await getSignedUrl(s3, command, { expiresIn: 60 })
    return url
}

const getPublicUrl = (key: string, bucket: string) => {
    return `https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`
}

export const S3Service = {
    createPresignedUrl,
    getPublicUrl,
}
