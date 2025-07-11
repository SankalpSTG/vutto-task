import { create } from "zustand";
import { BikeAdFiltersStore, BikeAdsFiltersType } from "./types";
import { immer } from "zustand/middleware/immer";
import { ClientApi } from "../../api/Api";
import { API_ENDPOINTS } from "../../constants/api-endpoints";

export const useBikeAdFiltersStore = create<BikeAdFiltersStore>()(
    immer((set) => ({
        data: {
            brands: [],
            models: []
        },
        loading: false,
        fetch: async () => {
            const response = await ClientApi.get<BikeAdsFiltersType[]>(API_ENDPOINTS.getBikeAdFilters)
            set((state: any) => {
                state.data = response?.data || []
            })
        },
        reset: () => {
            set((state) => {
                state.data = {
                    brands: [],
                    models: []
                }
            })
        }
    }))
)