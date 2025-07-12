import { FC, useEffect, useState } from "react"
import toast from "react-hot-toast"
import { ClientApi } from "../../../api/Api"
import { BikeImageUploadUrlType } from "../../../store/bike-image-upload-url/types"
import { API_ENDPOINTS } from "../../../constants/api-endpoints"
import axios from "axios"
import { FaPlus } from "react-icons/fa6"
import { ImageItem } from "../../../components/ImageItem"

export type BikeImagesProps = {
    images: string[]
    onChange: (key: string, value: any) => void
}
const BikeImages: FC<BikeImagesProps> = ({images, onChange}) => {
    const [file, setFile] = useState<File | null>(null)

    useEffect(() => {
        uploadFile()
    }, [file])

    const uploadFile = async () => {
        try{
            if(!file) return
            const nameChunks = file.name.split(".")
            const extension = nameChunks.length >= 2 ? nameChunks[nameChunks.length - 1]:null
            if(!extension) return toast("Invalid file type")

            const presignedUrl = await ClientApi.post<BikeImageUploadUrlType>(API_ENDPOINTS.createBikeImageUploadUrl, {
                extension: extension
            })
            if(!presignedUrl) return toast("Couldn't upload file")

            await axios.put(presignedUrl.data.preSignedUrl, file, {
                headers: {
                    "Content-Type": file.type
                }
            })
            onChange("images", [...images, presignedUrl.data.publicUrl])
        }catch(error){
            toast("Failed to upload file")
        }
    }
    const onDeleteClicked = (id: number) => {
        const confirmation = window.confirm("Delete Image?")
        if(!confirmation) return
        const newImages = [...images]
        newImages.splice(id, 1)
        onChange("images", newImages)
    }
    return <div className="w-full">
        <div>Images</div>
        <input id="bike-image-file-input" onChange={(e) => e.target.files?.length && setFile(e.target.files[0])} type="file" accept=".png,.jpg,.jpeg" hidden/>
        <div className="w-full h-fit flex items-center justify-start flex-wrap gap-2">
            <label htmlFor="bike-image-file-input">
                <ImageItem>
                    <FaPlus/>
                </ImageItem>
            </label>
            {/* <label htmlFor="bike-image-file-input" className="flex-shrink-0 w-[110px] aspect-square border border-gray-200 rounded-md flex items-center justify-center cursor-pointer">
            </label> */}
            {images.map((image, id) => <ImageItem key={id} onClick={() => onDeleteClicked(id)}>
                <img src={image} className="w-full"/>
            </ImageItem>)}
        </div>
    </div>
}

export default BikeImages