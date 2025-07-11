import { createBrowserRouter } from "react-router";
import { PAGE_ENDPOINTS } from "./constants/page-endpoints";
import LoginContainer from "./containers/auth/LoginContainer";
import AppLayout from "./layouts/AppLayout";
import RegisterContainer from "./containers/auth/RegisterContainer";
import ProtectedRoute from "./ProtectedRoute";
import DashboardContainer from "./containers/dashboard/Dashboard";
import BikeDetailsContainer from "./containers/dashboard/BikeDetails";
import UserBikes from "./containers/dashboard/UserBikes";
import BikeAdForm from "./containers/dashboard/bike-ad-form/BikeAdForm";

const router = createBrowserRouter([{
    path: "/",
    element: <AppLayout/>,
    children:[{
        path: PAGE_ENDPOINTS.bikeDetails(":id"),
        element: <ProtectedRoute><BikeDetailsContainer/></ProtectedRoute>
    },{
        path: PAGE_ENDPOINTS.dashboard,
        element: <ProtectedRoute><DashboardContainer/></ProtectedRoute>
    },{
        path: PAGE_ENDPOINTS.editBike(":id"),
        element: <ProtectedRoute><BikeAdForm/></ProtectedRoute>
    },{
        path: PAGE_ENDPOINTS.login,
        element: <LoginContainer/>
    },{
        path: PAGE_ENDPOINTS.newBike,
        element: <ProtectedRoute><BikeAdForm/></ProtectedRoute>
    },{
        path: PAGE_ENDPOINTS.register,
        element: <RegisterContainer/>
    },{
        path: PAGE_ENDPOINTS.userBikes,
        element: <ProtectedRoute><UserBikes/></ProtectedRoute>
    }]
}])

export default router