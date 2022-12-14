import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const PrivateRoutesSL = ({ component: Component, ...rest }) => {
  const { user } = useAuth0();

  let auth = user[`https://any-namespace/roles`].length === 1;

  return auth ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutesSL;
