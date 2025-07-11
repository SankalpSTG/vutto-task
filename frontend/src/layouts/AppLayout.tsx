import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
const AppLayout = () => {
  return (
    <>
      <Outlet />
      <Toaster/>
    </>
  );
};

export default AppLayout