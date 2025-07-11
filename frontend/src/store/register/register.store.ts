import { create } from "zustand";
import { RegisterStore } from "./types";
import { immer } from "zustand/middleware/immer";
import { ClientApi } from "../../api/Api";
import { API_ENDPOINTS } from "../../constants/api-endpoints";

export const useRegisterStore = create<RegisterStore>()(
    immer((set, get) => ({
        data: {
            name: "",
            email: "",
            phoneNumber: "",
            password: ""
        },
        success: false,
        loading: false,
        update: (key, value) => {
            set((state: any) => {
                state.data[key] = value
            })
        },
        submit: async () => {
            const state = get()
            set((state) => {state.loading = true})
            const response = await ClientApi.post(API_ENDPOINTS.register, state.data)
            set((state) => {
                state.loading = false
                state.success = response != null
            })
        },
        reset: () => {
            set((state) => {
                state.data = {
                    name: "",
                    email: "",
                    phoneNumber: "",
                    password: ""
                }
            })
        }
    }))
)