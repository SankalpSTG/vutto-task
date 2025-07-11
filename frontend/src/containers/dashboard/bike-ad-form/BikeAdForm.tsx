import { useEffect } from "react"
import DashboardLayout from "../../../layouts/dashboard/DashboardLayout"
import { useBikeAdFormStore } from "../../../store/bike-ads/bike-ad-form.store"
import { useNavigate, useParams } from "react-router"
import { safeParseInt } from "../../../utils/parsing"
import BikeImages from "./BikeImages"
import { PAGE_ENDPOINTS } from "../../../constants/page-endpoints"

const BikeAdForm = () => {
    const params = useParams()
    const state = useBikeAdFormStore()
    const navigate = useNavigate()
    useEffect(() => {
        if(state.success){
            navigate(PAGE_ENDPOINTS.userBikes)
        }
        return () => {
            state.reset()
        }
    }, [state.success])
    useEffect(() => {
        if(params.id){
            state.fetch(params.id)
        }
    }, [params])
    const onSubmit = () => {
        state.submit(params.id)
    }
    return <DashboardLayout>
        <div className="w-full h-fit max-h-full overflow-y-scroll flex flex-col items-center justify-start p-4 gap-2">
            <div className="w-[360px] max-w-full mx-auto flex flex-col items-center justify-start gap-2">
                <div className="text-xl font-medium">New Bike Ad</div>
                <div className="w-full border border-gray-200 rounded-md p-2">
                    <div className="w-full text-gray-600 text-sm">Ad Title</div>
                    <input name="title" value={state.data.title} onChange={(e) => state.update(e.target.name, e.target.value)} className="w-full p-2 border border-gray-200 rounded-md" placeholder="Ad Title"/>
                </div>
                <div className="w-full border border-gray-200 rounded-md p-2">
                    <div className="w-full text-gray-600 text-sm">Description</div>
                    <textarea name="description" value={state.data.description} onChange={(e) => state.update(e.target.name, e.target.value)} className="w-full p-2 border border-gray-200 rounded-md" placeholder="Ad Description"/>
                </div>
                <div className="w-full border border-gray-200 rounded-md p-2">
                    <div className="w-full text-gray-600 text-sm">Brand</div>
                    <input name="brand" value={state.data.brand} onChange={(e) => state.update(e.target.name, e.target.value)} className="w-full p-2 border border-gray-200 rounded-md" placeholder="Brand"/>
                </div>
                <div className="w-full border border-gray-200 rounded-md p-2">
                    <div className="w-full text-gray-600 text-sm">Model</div>
                    <input name="model" value={state.data.model} onChange={(e) => state.update(e.target.name, e.target.value)} className="w-full p-2 border border-gray-200 rounded-md" placeholder="Model"/>
                </div>
                <div className="w-full border border-gray-200 rounded-md p-2">
                    <div className="w-full text-gray-600 text-sm">Manufacturing Year</div>
                    <input name="manufacturingYear" value={state.data.manufacturingYear} onChange={(e) => state.update(e.target.name, safeParseInt(e.target.value, new Date().getFullYear()))} className="w-full p-2 border border-gray-200 rounded-md" placeholder="Manufacturing Year"/>
                </div>
                    <div className="w-full border border-gray-200 rounded-md p-2">
                    <div className="w-full text-gray-600 text-sm">Kms Driven</div>
                <input name="kmsDriven" value={state.data.kmsDriven} onChange={(e) => state.update(e.target.name, safeParseInt(e.target.value, 0))} className="w-full p-2 border border-gray-200 rounded-md" placeholder="KMS Driven"/>
                    </div>
                <div className="w-full border border-gray-200 rounded-md p-2">
                    <div className="w-full text-gray-600 text-sm">Price</div>
                    <input name="price" value={state.data.price} onChange={(e) => state.update(e.target.name, safeParseInt(e.target.value, 0))} className="w-full p-2 border border-gray-200 rounded-md" placeholder="Asking Price"/>
                </div>
                <BikeImages images={state.data.images} onChange={state.update}/>
                <div onClick={() => onSubmit()} className="w-full p-2 bg-[#d23957] rounded-md shadow-md text-center text-white cursor-pointer hover:bg-gray-600">Submit</div>
            </div>
        </div>
    </DashboardLayout>
}

export default BikeAdForm