import { useNavigate } from "react-router"
import { PAGE_ENDPOINTS } from "../../constants/page-endpoints"
import AuthLayout from "../../layouts/auth/AuthLayout"
import { useLoginStore } from "../../store/login/login.store"
import { useEffect } from "react"
import { Input } from "../../components/Input"

const LoginContainer = () => {
    const state = useLoginStore()
    const navigate = useNavigate()
    useEffect(() => {
        if(state.success){
            navigate(PAGE_ENDPOINTS.dashboard)
        }
        return () => {
            state.reset()
        }
    }, [state.success])
    return <AuthLayout>
        <div className="w-full p-4 flex flex-col items-center justify-center gap-2">
            <div>
                <img className="mx-auto" src="https://vutto.in/_next/image/?url=%2Fassets%2Fimages%2Flogo_full.png%3Fv%3D2&w=96&q=75"/>
            </div>
            <div className="w-full flex flex-col items-center justify-center gap-2">
                <Input value={state.data.email} onChange={(e) => state.update(e.target.name, e.target.value)} name="email" type="email" placeHolder="Email"/>
                <Input value={state.data.password} onChange={(e) => state.update(e.target.name, e.target.value)} name="password" type="password" placeHolder="Password"/>
            </div>
            <div className="w-full">
                <div onClick={() => state.submit()} className="w-full p-2 bg-gray-200 rounded-md hover:bg-[#d23957] hover:text-white text-center cursor-pointer transition-all">Sign In</div>
            </div>
            <div className="text-gray-600">
                <a href={PAGE_ENDPOINTS.register}><span className="hover:text-[#d23957] cursor-pointer">click here</span></a> to register
            </div>
        </div>
    </AuthLayout>
}

export default LoginContainer