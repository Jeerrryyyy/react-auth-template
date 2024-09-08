import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { Role } from "../store/userStore";

interface PrivateRouteProps {
  isAdminRoute?: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ isAdminRoute }) => {
  const { accessToken, role } = useAuthStore();

  if (!accessToken) {
    return <Navigate to="/login" />;
  }

  console.log(role)
  if (isAdminRoute && role !== Role.ADMIN) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
