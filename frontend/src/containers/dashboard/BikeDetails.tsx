import { useEffect } from "react"
import DashboardLayout from "../../layouts/dashboard/DashboardLayout"
import { useParams } from "react-router-dom"
import { useBikeAdDetailsStore } from "../../store/bike-ads/bike-ad-details.store"

const BikeDetailsContainer = () => {
    const state = useBikeAdDetailsStore()
    const {id} = useParams()
    useEffect(() => {
        if(id){
            state.fetch(id)
        }
    }, [id])
    return <DashboardLayout>
        {state.data ? <div className="w-full h-full overflow-y-scroll p-4">
            <div className="grid grid-cols-2 max-[576px]:grid-cols-1">
                <div className="flex items-center justify-start flex-wrap gap-2">
                    {state.data.images.map(image => <img className="w-[180px] flex-shrink-0 aspect-square rounded-md border-2 border-gray-200 p-1" src={image}/>)}
                </div>
                <div className="flex flex-col items-center justify-start gap-2">
                    <div className="w-full text-3xl font-medium">{state.data.title}</div>
                    <hr className="w-full border-gray-200"/>
                    <div className="w-full">{state.data.description}</div>
                    <hr className="w-full border-gray-200"/>
                    <div className="w-full flex flex-col items-center justify-start divide-y divide-gray-200">
                        <div className="w-full grid grid-cols-2 gap-2">
                            <div>Brand</div>
                            <div>{state.data.brand}</div>
                        </div>
                        <div className="w-full grid grid-cols-2 gap-2">
                            <div>Model</div>
                            <div>{state.data.model}</div>
                        </div>
                        <div className="w-full grid grid-cols-2 gap-2">
                            <div>Manufacturing Year</div>
                            <div>{state.data.manufacturingYear}</div>
                        </div>
                        <div className="w-full grid grid-cols-2 gap-2">
                            <div>KMS Driven</div>
                            <div>{state.data.kmsDriven}</div>
                        </div>
                    </div>
                    <div className="w-full text-3xl">
                        Rs. {state.data.price.toLocaleString("hi")}
                    </div>
                </div>
            </div>
        </div> : <>Loading</>}
    </DashboardLayout>
}

export default BikeDetailsContainer