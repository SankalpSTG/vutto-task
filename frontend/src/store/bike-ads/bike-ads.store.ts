import { create } from "zustand";
import { BikeAdsStore, BikeAdType } from "./types";
import { immer } from "zustand/middleware/immer";
import { ClientApi } from "../../api/Api";
import { API_ENDPOINTS } from "../../constants/api-endpoints";

export const useBikeAdsStore = create<BikeAdsStore>()(
    immer((set, get) => ({
        data: [],
        filters: {
            brand: "",
            model: ""
        },
        loading: false,
        fetch: async () => {
            const state = get()
            const response = await ClientApi.get<BikeAdType[]>(API_ENDPOINTS.getBikeAds(new URLSearchParams(state.filters).toString()))
            set((state: any) => {
                state.data = response?.data || []
            })
        },
        reset: () => {
            set((state) => {
                state.data = [],
                state.filters = {
                    brand: "",
                    model: ""
                }
            })
        }
    }))
)