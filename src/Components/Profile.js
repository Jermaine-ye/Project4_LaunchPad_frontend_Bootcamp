import React from "react";
import {
  Menu,
  Button,
  Text,
  Avatar,
  Title,
  Center,
  Image,
} from "@mantine/core";
import { IconSettings, IconMessageCircle, IconNotes } from "@tabler/icons";
import ProgressBar from "./ProgressBar";
import Badges from "./Badges";
import pic from "../images/profile pic.jpg";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../constants.js";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useAuth } from "./AuthContext";

// to add in get photo URL for profile picture here + also the name upon auth0 log in

const Profile = () => {
  const { cadetInfo } = useAuth();

  return (
    <div className="profile-menu">
      <Menu withArrow shadow="md" width={250}>
        <Menu.Target>
          <Avatar
            component="a"
            target="_blank"
            src={pic}
            alt="it's me"
            radius="xl"
            size="lg"
          />
        </Menu.Target>

        <Menu.Dropdown align="center">
          <Image src={pic} alt="it's me" size="xl" />
          <Title order={4}>Welcome {cadetInfo.name}</Title>
          <br />
          <ProgressBar />
          <Title order={6}>Badges Earned:</Title>
          <Badges />
          <br />
          <Menu.Label>Settings</Menu.Label>

          <Menu.Item icon={<IconMessageCircle size={14} />}>Messages</Menu.Item>
          <Menu.Item icon={<IconNotes size={14} />}>Notes</Menu.Item>
          <Menu.Item icon={<IconSettings size={14} />}>Settings</Menu.Item>
        </Menu.Dropdown>
      </Menu>

      {/* Should be done with a mantine menu element or modal */}
    </div>
  );
};

export default Profile;
