import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const PrivateRoutesCadet = ({ component: Component, ...rest }) => {
  const { user } = useAuth0();
  console.log(user);
  let auth = 0;
  return auth ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutesCadet;
