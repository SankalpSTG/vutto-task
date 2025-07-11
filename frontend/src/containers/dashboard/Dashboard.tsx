import { useEffect } from "react"
import DashboardLayout from "../../layouts/dashboard/DashboardLayout"
import { useBikeAdsStore } from "../../store/bike-ads/bike-ads.store"
import { BikeListItem } from "../../components/BikeListItem"
import { useBikeAdFiltersStore } from "../../store/bike-ads/bike-ad-filters.store"

const DashboardContainer = () => {
    const state = useBikeAdsStore()
    const filters = useBikeAdFiltersStore()

    useEffect(() => {
        state.fetch()
        filters.fetch()
    }, [state.filters.brand, state.filters.model])
    return <DashboardLayout>
        <div className="w-full h-full overflow-y-scroll">
            <div className="w-full flex items-center justify-center gap-2">
                <select name="brand" onChange={(e) => state.setFilters(e.target.name, e.target.options[e.target.selectedIndex].value)} className="p-2 bg-gray-200">
                    <option value={""}>Select Brand</option>
                    {filters.data.brands.map((brand) => <option key={brand}>{brand}</option>)}
                </select>
                <select name="model" onChange={(e) => state.setFilters(e.target.name, e.target.options[e.target.selectedIndex].value)} className="p-2 bg-gray-200">
                    <option value={""}>Select Model</option>
                    {filters.data.models.map((model) => <option key={model}>{model}</option>)}
                </select>
            </div>
            <div className="w-full flex items-start justify-start flex-wrap p-4 gap-2">
                {state.data.map(bikeAd => <BikeListItem _id={bikeAd._id} image={bikeAd.images[0]} title={bikeAd.title} description={bikeAd.description}/>)}
            </div>
        </div>
    </DashboardLayout>
}

export default DashboardContainer