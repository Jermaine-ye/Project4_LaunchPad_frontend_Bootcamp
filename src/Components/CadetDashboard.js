import React from 'react';
import { useState, useEffect } from 'react';
import {
  AppShell,
  Burger,
  Header,
  MediaQuery,
  Navbar,
  Text,
  Image,
  Button,
  useMantineTheme,
  Title,
} from '@mantine/core';

import Profile from './Profile';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import { ThemeContext } from '@emotion/react';
import DisplayMarkdown from './DisplayMarkdown';
import LogoutButton from './LogoutButton';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';

import Rlogo from '../images/rocket-logo.png';
import { IconHome2, IconCalendarEvent } from '@tabler/icons';

import CadetLandingPage from './CadetLandingPage';
import MainMap from './CourseComponents/MainMap';
import Welcome from './CourseComponents/Welcome';
import Logistics from './CourseComponents/Logistics';
import GeneralRef from './CourseComponents/GeneralRef';
import Foundations from './CourseComponents/Foundations';
import Frontend from './CourseComponents/Frontend';
import FullStack from './CourseComponents/FullStack';
import Backend from './CourseComponents/Backend';
import Capstone from './CourseComponents/Capstone';
import Algorithms from './CourseComponents/Algorithms';
import InterviewPrep from './CourseComponents/InterviewPrep';
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
              {/* <Text component={Link} variant="link" to="/">
                  Home Page
                </Text> */}
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
              <Text
                ta="left"
                component={Link}
                variant="link"
                // to="/general-ref/3"
              >
                📚General Reference
              </Text>
              <Text
                ta="left"
                component={Link}
                variant="link"
                // to="/foundations/4"
              >
                💎Foundations
              </Text>
              <Text ta="left" component={Link} variant="link" to="/frontend/5">
                🖼️Frontend
              </Text>
              <Text
                ta="left"
                component={Link}
                variant="link"
                // to="/full-stack/6"
              >
                🏭Full Stack
              </Text>
              <Text ta="left" component={Link} variant="link">
                {/* <Text ta="left" component={Link} variant="link" to="/backend/7"> */}
                🤖Backend
              </Text>
              <Text ta="left" component={Link} variant="link">
                {/* <Text ta="left" component={Link} variant="link" to="/capstone/8"> */}
                ⛰️Capstone
              </Text>
              <Text
                ta="left"
                component={Link}
                variant="link"
                // to="/algorithms/9"
              >
                🧮Algorithms
              </Text>
              <Text
                ta="left"
                component={Link}
                variant="link"
                // to="/interview-prep/10"
              >
                💼Interview Prep
              </Text>
            </div>
          </Navbar.Section>
          <Navbar.Section>
            {/* <Text className="footer-text">Footer</Text> */}
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
          <Route path="/logistics/:sectionId" element={<Logistics />} />
          <Route path="/general-ref/:sectionId" element={<GeneralRef />} />
          <Route path="/foundations/:sectionId" element={<Foundations />} />
          <Route path="/frontend/:sectionId" element={<Frontend />} />
          <Route path="/full-stack/:sectionId" element={<FullStack />} />
          <Route path="/backend/:sectionId" element={<Backend />} />
          <Route path="/capstone/:sectionId" element={<Capstone />} />
          <Route path="/algorithms/:sectionId" element={<Algorithms />} />
          <Route
            path="/interview-prep/:sectionId"
            element={<InterviewPrep />}
          />
        </Route>
        <Route path="/schedule" element={<Schedule />} />
      </Routes>
    </AppShell>
  );
};

export default withAuthenticationRequired(CadetDashboard, {
  onRedirecting: () => <Loading />,
});
