import React from 'react';
import TimeDisplay from './TimeDisplay';
import { Outlet } from 'react-router-dom';
const SLLandingPage = () => {
  return (
    <div>
      <Outlet />
      <TimeDisplay />
    </div>
  );
};

export default SLLandingPage;
