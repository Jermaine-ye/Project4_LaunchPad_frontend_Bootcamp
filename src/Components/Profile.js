import React from 'react';
import {
  Menu,
  Button,
  Text,
  Avatar,
  Title,
  Center,
  Image,
} from '@mantine/core';
// import { IconSettings, IconMessageCircle, IconNotes } from '@tabler/icons';
import ProgressBar from './ProgressBar';
import Badges from './Badges';

import { useAuth } from './AuthContext';

const Profile = () => {
  const { cadetInfo } = useAuth();

  return (
    <div className="profile-menu">
      <Menu withArrow shadow="md" width={250}>
        <Menu.Target>
          <Avatar
            component="a"
            target="_blank"
            src={cadetInfo.photoLink}
            alt="it's me"
            radius="xl"
            size="lg"
          />
        </Menu.Target>

        <Menu.Dropdown align="center">
          <Image src={cadetInfo.photoLink} alt="it's me" size="xl" />
          <Title order={4}>Cadet {cadetInfo.name}</Title>
          <br />
          <ProgressBar />
          <Title order={6}>Section Badges Earned:</Title>
          <Badges />
          <br />
          {/* <Menu.Label>Settings</Menu.Label> */}

          {/* <Menu.Item icon={<IconMessageCircle size={14} />}>Messages</Menu.Item> */}
          {/* <Menu.Item icon={<IconNotes size={14} />}>Notes</Menu.Item> */}
          {/* <Menu.Item icon={<IconSettings size={14} />}>Settings</Menu.Item> */}
        </Menu.Dropdown>
      </Menu>
    </div>
  );
};

export default Profile;
