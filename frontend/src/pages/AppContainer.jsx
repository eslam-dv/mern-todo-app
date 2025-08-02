import { Navigate, Outlet } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import { LoadingSpinner } from "../components/LoadingSpinner";

const AppContainer = () => {
  const { user, isLoading } = useAuth();

  return isLoading ? (
    <LoadingSpinner />
  ) : user ? (
    <Outlet />
  ) : (
    <Navigate
      to="/login"
      replace
      state={{ redirectUrl: window.location.pathname }}
    />
  );
};

export default AppContainer;
