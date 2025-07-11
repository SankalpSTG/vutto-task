import { create } from "zustand";
import { BikeAdDetailsStore, BikeAdDetailsType } from "./types";
import { immer } from "zustand/middleware/immer";
import { ClientApi } from "../../api/Api";
import { API_ENDPOINTS } from "../../constants/api-endpoints";

export const useBikeAdDetailsStore = create<BikeAdDetailsStore>()(
    immer((set) => ({
        data: null,
        loading: false,
        fetch: async (id: string) => {
            const response = await ClientApi.get<BikeAdDetailsType>(API_ENDPOINTS.getBikeAdDetails(id))
            set((state: any) => {
                state.data = response?.data || null
            })
        },
        reset: () => {
            set((state) => {
                state.data = null
            })
        }
    }))
)