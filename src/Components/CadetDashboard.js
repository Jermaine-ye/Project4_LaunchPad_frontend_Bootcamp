import React from 'react';
import { useState, useEffect } from 'react';
import { AppShell, Navbar, Text, Image, Title } from '@mantine/core';

import { Link, Route, Routes } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import Rlogo from '../images/rocket-logo.png';
import { IconHome2, IconCalendarEvent } from '@tabler/icons';
import CadetLandingPage from './CadetLandingPage';
import MainMap from './CourseComponents/MainMap';
import Welcome from './CourseComponents/Welcome';
import Frontend from './CourseComponents/Frontend';
import Schedule from './Schedule';
import Loading from './Loading';
import { useAuth } from './AuthContext';
import axios from 'axios';
import { BACKEND_URL } from '../constants';

const CadetDashboard = () => {
  const [opened, setOpened] = useState(false);
  const { user, isAuthenticated } = useAuth0();
  const { updateCadetInfo, cadetInfo } = useAuth();

  const getAllInfo = async () => {
    if (user[`https://any-namespace/roles`].length === 0) {
      const response = await axios.get(`${BACKEND_URL}/cadets/cadet`, {
        params: {
          cadetEmail: user.email,
        },
      });

      updateCadetInfo(response.data);
      console.log(response.data);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      getAllInfo();
    }
  }, [user]);

  return (
    <AppShell
      // navbarOffsetBreakpoint controls when navbar should no longer be offset with padding-left
      navbarOffsetBreakpoint="sm"
      // fixed prop on AppShell will be automatically added to Header and Navbar
      // fixed
      navbar={
        <Navbar
          padding="md"
          // Breakpoint at which navbar will be hidden if hidden prop is true
          hiddenBreakpoint="sm"
          // Hides navbar when viewport size is less than value specified in hiddenBreakpoint
          hidden={!opened}
          // when viewport size is less than theme.breakpoints.sm navbar width is 100%
          // viewport size > theme.breakpoints.sm – width is 300px
          // viewport size > theme.breakpoints.lg – width is 400px
          width={{ sm: 400, lg: 300 }}
        >
          <Navbar.Section>
            <div
              className="nav-logo"
              style={{
                width: 250,
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              <Image src={Rlogo} alt="rocket logo" />
            </div>
          </Navbar.Section>
          <Title order={5} color="white">
            Welcome <br />
          </Title>
          <Title order={3} color="yellow">
            {cadetInfo.name}
          </Title>
          <Navbar.Section grow mt="lg">
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Text
                ta="center"
                fw={500}
                component={Link}
                variant="link"
                to="/main-map"
              >
                <IconHome2 color="white" size={13} />
                Home Page
              </Text>
              <Text
                ta="center"
                fw={500}
                component={Link}
                variant="link"
                to="/schedule"
              >
                {' '}
                <IconCalendarEvent color="white" size={13} />
                Schedule
              </Text>
              <br />
              <Text ta="left" component={Link} variant="link" to="/welcome/1">
                🚀Welcome to Rocket
              </Text>

              <Text ta="left" component={Link} variant="link">
                🛠️Logistics
              </Text>
              <Text ta="left" component={Link} variant="link">
                📚General Reference
              </Text>
              <Text ta="left" component={Link} variant="link">
                💎Foundations
              </Text>
              <Text ta="left" component={Link} variant="link" to="/frontend/5">
                🖼️Frontend
              </Text>
              <Text ta="left" component={Link} variant="link">
                🏭Full Stack
              </Text>
              <Text ta="left" component={Link} variant="link">
                🤖Backend
              </Text>
              <Text ta="left" component={Link} variant="link">
                ⛰️Capstone
              </Text>
              <Text ta="left" component={Link} variant="link">
                🧮Algorithms
              </Text>
              <Text ta="left" component={Link} variant="link">
                💼Interview Prep
              </Text>
            </div>
          </Navbar.Section>
          <Navbar.Section>
            <LogoutButton />
            <br />
            <br />
          </Navbar.Section>
        </Navbar>
      }
    >
      <Routes>
        <Route path="/" element={<CadetLandingPage />}>
          <Route path="/main-map" element={<MainMap />} />
          <Route path="/welcome/:sectionId" element={<Welcome />} />
          <Route path="/frontend/:sectionId" element={<Frontend />} />
        </Route>
        <Route path="/schedule" element={<Schedule />} />
      </Routes>
    </AppShell>
  );
};

export default withAuthenticationRequired(CadetDashboard, {
  onRedirecting: () => <Loading />,
});
