import { Navigate, Outlet } from "react-router-dom";

const Public = () => {
  const token = localStorage.getItem("token");

  return !token ? <Outlet /> : <Navigate to="/" />;
};

export default Public;