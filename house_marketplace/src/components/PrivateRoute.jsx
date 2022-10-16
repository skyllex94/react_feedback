import { Navigate, Outlet } from "react-router-dom";
import { UseAuth } from "../hooks/UseAuth";
import Spinner from "./Spinner";

const PrivateRoute = () => {
  const { loggedIn, checkingStatus } = UseAuth();
  if (checkingStatus) {
    return <Spinner />;
  }

  return loggedIn ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoute;
