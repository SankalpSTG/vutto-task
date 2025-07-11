export const PAGE_ENDPOINTS = {
    bikeDetails:(id: string) => "/dashboard/bike/details/" + id,
    dashboard: "/dashboard",
    editBike: (id: string) => "/dashboard/bike/edit/" + id,
    login: "/",
    newBike: "/dashboard/bike/new",
    register: "/register",
    userBikes: "/dashboard/user/bikes",
}
