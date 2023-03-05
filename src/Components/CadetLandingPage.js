import React from 'react';
import Profile from './Profile';
import TimeDisplay from './TimeDisplay';
import { Outlet } from 'react-router-dom';

const CadetLandingPage = () => {
  return (
    <div className="bg-container">
      <Outlet />
      <Profile />
      <TimeDisplay />
    </div>
  );
};

export default CadetLandingPage;
