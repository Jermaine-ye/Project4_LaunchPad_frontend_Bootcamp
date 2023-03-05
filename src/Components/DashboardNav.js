import React from 'react';
import CadetDashboard from './CadetDashboard';
import SLDashboard from './SLDashboard';
import { useAuth0 } from '@auth0/auth0-react';

const DashBoardNav = () => {
  const { user } = useAuth0();

  return user[`https://any-namespace/roles`].length !== 0 ? (
    <SLDashboard />
  ) : (
    <CadetDashboard />
  );
};

export default DashBoardNav;
