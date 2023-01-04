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
  Title,
} from '@mantine/core';

import Profile from './Profile';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import { ThemeContext } from '@emotion/react';
import DisplayMarkdown from './DisplayMarkdown';
import CadetDashboard from './CadetDashboard';
import { useAuth } from './AuthContext';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import CadetChaptProgress from './CadetChaptProgress';
import Forum from './Forum';
import ForumChapter from './ForumChapter';
import ForumSection from './ForumSection';
import LogoutButton from './LogoutButton';
import axios from 'axios';
import { BACKEND_URL } from '../constants';

import Rlogo from '../images/rocket-logo.png';
import { IconHome2, IconCalendarEvent } from '@tabler/icons';

import MainMap from './CourseComponents/MainMap';

import SLLandingPage from './SLLandingPage';
import Schedule from './Schedule';
import Loading from './Loading';
import CadetProgress from './CadetProgress';
import GitHubSubmissionsDisplay from './GitHubSubmissionsDisplay';

const SLDashboard = () => {
  const [opened, setOpened] = useState(false);
  const { user, isAuthenticated } = useAuth0();
  const { updateSlInfo, slInfo } = useAuth();

  const [submissionsData, setSubmissionsData] = useState([]);

  const getAllInfo = async () => {
    if (user[`https://any-namespace/roles`].length === 1) {
      //need to create SL controller
      const response = await axios.get(`${BACKEND_URL}/sls/sl`, {
        params: {
          slEmail: user.email,
        },
      });

      updateSlInfo(response.data);
      console.log(response.data);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      getAllInfo();
    }
  }, [user]);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/gitHubSubmissions`);

        console.log('all submissions info', response.data);
        setSubmissionsData(response.data);
      } catch (err) {
        console.log(err.response.data);
      }
    };

    fetchSubmissions();
  }, []);

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
            <br />
          </Navbar.Section>
          <Title order={5} color="white">
            Welcome <br />
          </Title>
          <Title order={3} color="yellow">
            {slInfo.name}
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
                to="/forum/1/1"
                // to="/forum"
              >
                <IconHome2 color="white" size={13} />
                Forum
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
              <Text
                ta="center"
                fw={500}
                component={Link}
                variant="link"
                to="/submissions"
              >
                {' '}
                <IconCalendarEvent color="white" size={13} />
                GitHub Submissions
              </Text>
              <br />
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
        <Route path="/" element={<SLLandingPage />}>
          <Route path="/main-map" element={<CadetProgress />} />
          <Route path="/main-map/:sectionId" element={<CadetProgress />} />
          <Route
            path="/submissions"
            element={<GitHubSubmissionsDisplay data={submissionsData} />}
          />

          {/* <Route path="/main-map/:sectionId" element={<CadetChaptProgress />} /> */}
        </Route>

        <Route path="/forum" element={<Forum />}>
          <Route path="/forum/:sectionId" element={<Forum />} />
          <Route path="/forum/:sectionId/:chapterId" element={<Forum />} />
          {/* <Route path="/forum/:sectionId/:chapterId" element={<Forum />} /> */}
          {/* <Route
            path="/cadet-progress/:cadetId"
            element={<SingleCadetProgress />}
          /> */}
        </Route>
        <Route path="/schedule" element={<Schedule />} />
      </Routes>
    </AppShell>
  );
};

export default withAuthenticationRequired(SLDashboard, {
  onRedirecting: () => <Loading />,
});
