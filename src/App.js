import React from 'react';
import './App.css';
import { Paper } from '@mantine/core';
import RocketMainPage from './Components/RocketMainPage';
import { useAuth0 } from '@auth0/auth0-react';
import DashBoardNav from './Components/DashboardNav';

import { AuthProvider } from './Components/AuthContext';

export default function App() {
  const { isAuthenticated } = useAuth0();

  return (
    <AuthProvider>
      <div className="App">
        <Paper>
          {isAuthenticated !== false ? <DashBoardNav /> : <RocketMainPage />}
        </Paper>
      </div>
    </AuthProvider>
  );
}
