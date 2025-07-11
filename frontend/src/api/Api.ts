import axios, { AxiosError } from "axios"
import { ErrorResponseType, RequestDataType, ResponseType } from "./types"
import toast from "react-hot-toast"
import { PAGE_ENDPOINTS } from "../constants/page-endpoints"

export const ClientApi = {
    get: async <T=any>(url: string, query?: any) => {
        return await ClientApi.request<T>(url, "GET", {query})
    },
    post: async <T=any>(url: string, data?: any) => {
        return await ClientApi.request<T>(url, "POST", {data})
    },
    put: async <T=any>(url: string, data?: any) => {
        return await ClientApi.request<T>(url, "PUT", {data})
    },
    delete: async <T=any>(url: string, data?: any) => {
        return await ClientApi.request<T>(url, "DELETE", {data})
    },
    request: async <T=any>(url: string, method: "GET" | "POST" | "PUT" | "DELETE", data?: RequestDataType) => {
        try {
            const response = await axios.request<ResponseType<T>>({
                url: url,
                method: method,
                data: data?.data,
                params: data?.query,
                withCredentials: true,
            })
            return response.data
        } catch (error) {
            console.log(error)
            if(!axios.isAxiosError(error)) return null
            const err = error as AxiosError<ErrorResponseType>
            if(err.response?.data.statusCode == 401){
                if(window) window.location.href = PAGE_ENDPOINTS.login
            }else if(err.response?.data.statusCode == 429){
                throw error
            }else if(err.response?.data.statusCode == 400){
                toast(err.response.data.message)
            }else if (err.code == "ECONNREFUSED"){
                toast("Some error occured. Please try again later.")
                if(window) window.location.href = PAGE_ENDPOINTS.login
            }
            return null
        }
    }
}