import { FC } from "react"
import { Link } from "react-router-dom"
import { PAGE_ENDPOINTS } from "../constants/page-endpoints"

export type BikeListItemProps = {
    _id: string
    image: string
    title: string
    description: string
}
export const BikeListItem: FC<BikeListItemProps> = ({_id, image, title, description}) => {
    return <Link to={PAGE_ENDPOINTS.bikeDetails(_id)}><div className="w-[300px] max-w-full h-fit flex-shrink-0 bg-white rounded-md shadow-md p-2 cursor-pointer">
        <div className="w-full aspect-square rounded-md overflow-hidden bg-gray-100 flex items-center justify-center">
            <img src={image} className="w-full"/>
        </div>
        <div className="font-medium">{title}</div>
        <div className="text-gray-600 text-sm">{description.length >= 100? description.substring(0, 97) + "...": description}</div>
    </div></Link>
}