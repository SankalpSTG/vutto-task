import { FC, JSX } from "react"
import { Link, useNavigate } from "react-router-dom"
import { PAGE_ENDPOINTS } from "../../constants/page-endpoints"
import { IoLogOut } from "react-icons/io5"
import { ClientApi } from "../../api/Api"
import { API_ENDPOINTS } from "../../constants/api-endpoints"
import toast from "react-hot-toast"

export type DashboardLayoutProps = {
    children: JSX.Element
}
const DashboardLayout: FC<DashboardLayoutProps> = ({children}) => {
    const navigate = useNavigate()
    const onLogoutClicked = async () => {
        try{
            const confirmation = confirm("Logout?")
            if(!confirmation) return
            await ClientApi.post(API_ENDPOINTS.logout)
            navigate(PAGE_ENDPOINTS.login)
        }catch(error){
            toast("Failed to logout")
        }
    }
    return <div className="w-full h-[100vh] overflow-scroll flex flex-col items-center justify-start">
        <div className="flex-shrink-0 w-full h-[56px] bg-gray-100 shadow-md p-2 flex items-center justify-between">
            <img src="https://vutto.in/_next/image/?url=%2Fassets%2Fimages%2Flogo_full.png%3Fv%3D2&w=96&q=75"/>
            <div className="w-fit h-full flex items-center justify-center gap-4">
                <Link to={PAGE_ENDPOINTS.dashboard}><div className="text-gray-600 hover:text-[#d23957] cursor-pointer">Buy</div></Link>
                <Link to={PAGE_ENDPOINTS.userBikes}><div className="text-gray-600 hover:text-[#d23957] cursor-pointer">Sell</div></Link>
                <IoLogOut className="text-gray-600 hover:text-[#d23957] cursor-pointer text-2xl" onClick={() => onLogoutClicked()}/>
            </div>
        </div>
        <div className="w-full h-full p-2 overflow-y-scroll">
            <div className="w-[992px] max-w-full mx-auto h-full shadow-md">
                {children}
            </div>
        </div>
    </div>
}

export default DashboardLayout