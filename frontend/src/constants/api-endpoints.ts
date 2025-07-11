const BASE_URL = import.meta.env.VITE_BACKEND

export const API_ENDPOINTS = {
    login: BASE_URL + "/auth/login",
    isLoggedIn: BASE_URL + "/auth/is-logged-in",
    logout: BASE_URL + "/auth/logout",
    register: BASE_URL + "/auth/register",
    getBikeAds: (query?: string) => BASE_URL + "/bike-ads?" + query,
    getUserBikeAds: BASE_URL + "/bike-ads/user",
    getBikeAdDetails: (id: string) => BASE_URL + "/bike-ads/" + id,
    deleteBikeAd: (id: string) => BASE_URL + "/bike-ads/" + id,
    createBikeImageUploadUrl: BASE_URL + "/bike-ads/image/url",
    newBikeAd: BASE_URL + "/bike-ads",
    editBikeAd: (id: string) => BASE_URL + "/bike-ads/" + id,
    getBikeAdFilters: BASE_URL + "/bike-ads/filters",
}