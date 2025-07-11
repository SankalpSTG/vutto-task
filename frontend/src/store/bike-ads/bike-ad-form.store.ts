import { create } from "zustand";
import { BikeAdDetailsType, BikeAdFormStore } from "./types";
import { immer } from "zustand/middleware/immer";
import { ClientApi } from "../../api/Api";
import { API_ENDPOINTS } from "../../constants/api-endpoints";

export const useBikeAdFormStore = create<BikeAdFormStore>()(
    immer((set, get) => ({
        data: {
            title: "",
            description: "",
            brand: "",
            model: "",
            manufacturingYear: new Date().getFullYear(),
            kmsDriven: 0,
            price: 0,
            images: []
        },
        success: false,
        loading: false,
        fetch: async (id: string) => {
            const response = await ClientApi.get<BikeAdDetailsType>(API_ENDPOINTS.getBikeAdDetails(id))
            set((state: any) => {
                state.data = response?.data || null
            })
        },
        update: async (key: string, value: any) => {
            set((state: any) => {
                state.data[key] = value
            })
        },
        submit: async (id?: string) => {
            const state = get()
            set((state) => {state.loading = true})
            if(id) await ClientApi.put<BikeAdDetailsType>(API_ENDPOINTS.editBikeAd(id), state.data)
            else await ClientApi.post(API_ENDPOINTS.newBikeAd, state.data)
            set((state) => {
                state.loading = false
                state.success = true
            })
        },
        reset: () => {
            set((state) => {
                state.data = {
                    title: "",
                    description: "",
                    brand: "",
                    model: "",
                    manufacturingYear: new Date().getFullYear(),
                    kmsDriven: 0,
                    price: 0,
                    images: []
                }
                state.success = false
                state.loading = false
            })
        }
    }))
)