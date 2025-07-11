import { create } from "zustand";
import { BikeAdType, UserBikeAdsStore } from "./types";
import { immer } from "zustand/middleware/immer";
import { ClientApi } from "../../api/Api";
import { API_ENDPOINTS } from "../../constants/api-endpoints";

export const useUserBikeAdsStore = create<UserBikeAdsStore>()(
    immer((set) => ({
        data: [],
        loading: false,
        fetch: async () => {
            const response = await ClientApi.get<BikeAdType[]>(API_ENDPOINTS.getUserBikeAds)
            set((state: any) => {
                state.data = response?.data || []
            })
        },
        reset: () => {
            set((state) => {
                state.data = []
            })
        }
    }))
)