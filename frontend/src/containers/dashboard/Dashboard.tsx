import { useEffect } from "react"
import DashboardLayout from "../../layouts/dashboard/DashboardLayout"
import { useBikeAdsStore } from "../../store/bike-ads/bike-ads.store"
import { Link } from "react-router-dom"
import { PAGE_ENDPOINTS } from "../../constants/page-endpoints"

const DashboardContainer = () => {
    const state = useBikeAdsStore()

    useEffect(() => {
        state.fetch()
    }, [state.filters])
    return <DashboardLayout>
        <div className="w-full h-fit max-h-full overflow-y-scroll flex items-start justify-start flex-wrap p-4 gap-2">
            {state.data.map(bikeAd => <Link to={PAGE_ENDPOINTS.bikeDetails(bikeAd._id)}><div className="w-[300px] max-w-full h-fit flex-shrink-0 bg-white rounded-md shadow-md p-2 cursor-pointer">
                <div className="w-full aspect-square rounded-md overflow-hidden bg-gray-100 flex items-center justify-center">
                    <img src={bikeAd.images[0]} className="w-full"/>
                </div>
                <div className="font-medium">{bikeAd.title}</div>
                <div className="text-gray-600 text-sm">{bikeAd.description}</div>
            </div></Link>)}
        </div>
    </DashboardLayout>
}

export default DashboardContainer