import { useEffect } from "react"
import DashboardLayout from "../../layouts/dashboard/DashboardLayout"
import { Link } from "react-router-dom"
import { PAGE_ENDPOINTS } from "../../constants/page-endpoints"
import { useUserBikeAdsStore } from "../../store/bike-ads/user-bike-ads.store"
import { ClientApi } from "../../api/Api"
import { API_ENDPOINTS } from "../../constants/api-endpoints"
import { FaTrash } from "react-icons/fa6"
import toast from "react-hot-toast"

const UserBikes = () => {
    const state = useUserBikeAdsStore()

    const onDeleteClicked = async (id: string) => {
        try{
            const confirmation = confirm("Delete Ad?")
            if(!confirmation) return
            await ClientApi.delete(API_ENDPOINTS.deleteBikeAd(id))
            state.fetch()
        }catch(error){
            toast("Failed to delete ad post")
        }
    }
    useEffect(() => {
        state.fetch()
    }, [])
    return <DashboardLayout>
        <div className="w-full h-fit max-h-full overflow-y-scroll flex flex-col items-center justify-start p-4 gap-2">
            <div className="w-full flex items-center justify-end">
                <Link to={PAGE_ENDPOINTS.newBike}><div className="bg-[#d23957] text-white p-2 rounded-md hover:bg-gray-600 cursor-pointer">Creat Ad</div></Link>
            </div>
            {state.data.map(bikeAd => <div className="w-full flex items-center justify-between gap-2 border border-gray-100 hover:bg-gray-100 p-2 rounded-md">
                <Link className="w-fit flex-shrink-0" to={PAGE_ENDPOINTS.editBike(bikeAd._id)}><div className="w-[48px] aspect-square rounded-md overflow-hidden bg-gray-100 flex items-center justify-center">
                    <img src={bikeAd.images[0]} className="w-full"/>
                </div></Link>
                <Link className="w-full" to={PAGE_ENDPOINTS.editBike(bikeAd._id)}><div className="w-full">
                    <div className="font-medium">{bikeAd.title}</div>
                    <div className="text-gray-600 text-sm">{bikeAd.description}</div>
                </div></Link>
                <FaTrash onClick={(e) => {
                    e.stopPropagation()
                    onDeleteClicked(bikeAd._id)
                }} className="text-[#d23957] hover:text-gray-600 cursor-pointer"/>
            </div>)}
        </div>
    </DashboardLayout>
}

export default UserBikes