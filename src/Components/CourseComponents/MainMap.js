import { useState, useEffect } from 'react';
import { Button, Group, Text, Image, HoverCard, Title } from '@mantine/core';
import starpic from '../../images/Main tracker-01.png';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/MainMap.css';
import { BACKEND_URL } from '../../constants.js';
import MainMapBtn from './MainMapBtn';
import { useAuth0 } from '@auth0/auth0-react';
import { useAuth } from '../AuthContext';

function MainMap() {
  const [opened, setOpened] = useState(false);
  const [btn1, setBtn1] = useState('');
  const [btn2, setBtn2] = useState('');

  const [btn3, setBtn3] = useState('');
  const [btn4, setBtn4] = useState('');
  const [btn5, setBtn5] = useState('');
  const [btn6, setBtn6] = useState('');
  const [btn7, setBtn7] = useState('');
  const [btn8, setBtn8] = useState('');
  const [btn9, setBtn9] = useState('');
  const [btn10, setBtn10] = useState('');
  const { user, isAuthenticated } = useAuth0();
  const [cadetId, setCadetId] = useState('');
  const { cadetInfo } = useAuth();
  const navigate = useNavigate();
  const [completedChaps, setCompletedChaps] = useState({});

  const getAllInfo = async () => {};

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/sections`);

        console.log('sections', response.data);

        setBtn1(response.data[0]);
        setBtn2(response.data[1]);
        setBtn3(response.data[2]);
        setBtn4(response.data[3]);
        setBtn5(response.data[4]);
        setBtn6(response.data[5]);
        setBtn7(response.data[6]);
        setBtn8(response.data[7]);
        setBtn9(response.data[8]);
        setBtn10(response.data[9]);

        if (user[`https://any-namespace/roles`].length === 0) {
          const response = await axios.get(`${BACKEND_URL}/cadets/cadet`, {
            params: {
              cadetEmail: user.email,
            },
          });

          setCadetId(response.data.id);
          console.log(response.data.id);

          const response2 = await axios.get(
            `${BACKEND_URL}/cadetSections/completed-progress-status?cadetId=${response.data.id}`
          );
          console.log('res2', response2.data);
          let sectsCompleted = {};

          for (let i = 0; i < response2.data.length; i++) {
            sectsCompleted[response2.data[i].sectionId] = true;
          }

          setCompletedChaps(sectsCompleted);
          console.log('sects Completed', sectsCompleted);
        }
      } catch (err) {
        console.log(err.response.data);
      }
    };

    fetchSections();
  }, [user]);

  return (
    <>
      <Title order={3} color="yellow">
        Sections Map
      </Title>
      <Image className="star-pic-sect" src={starpic} />
      <Group position="center">
        <div className="Section-1-btn">
          <HoverCard
            width={280}
            position="top"
            withArrow
            shadow="md"
            closeDelay={200}
          >
            <HoverCard.Target>
              <Button
                id={1}
                radius={'xl'}
                styles={(theme) => ({
                  root: {
                    backgroundColor: completedChaps[btn1.id]
                      ? '#ef5152'
                      : '#ABB2B9',
                    border: 0,
                    height: 33,
                    paddingLeft: 15,
                    paddingRight: 15,
                    color: '#fff',

                    '&:hover': {
                      backgroundColor: completedChaps[btn1.id]
                        ? theme.fn.darken('#ef5152', 0.2)
                        : theme.fn.darken('#ABB2B9', 0.2),
                      color: '#ffeb99',
                    },
                  },
                })}
                onClick={() => {
                  navigate('/welcome/1');
                }}
              >
                {btn1.id}
              </Button>
            </HoverCard.Target>
            <HoverCard.Dropdown>
              <Text fw={500} size="sm">
                Welcome! Coding Bootcamp is Rocket Academy's flagship
                career-conversion course. It builds on concepts from Rocket's
                intro coding course.
              </Text>
            </HoverCard.Dropdown>
          </HoverCard>
          <Text fw={600} c="white" ta="left">
            {btn1.name}
          </Text>
        </div>
        <div className="Section-2-btn">
          <Text fw={600} c="white" ta="left">
            {btn2.name}
          </Text>
          <HoverCard width={280} withArrow shadow="md" closeDelay={200}>
            <HoverCard.Target>
              <Button
                id={2}
                radius={'xl'}
                styles={(theme) => ({
                  root: {
                    backgroundColor: completedChaps[btn2.id]
                      ? '#ef5152'
                      : '#ABB2B9',
                    border: 0,
                    height: 33,
                    paddingLeft: 14,
                    paddingRight: 14,
                    color: '#fff',

                    '&:hover': {
                      backgroundColor: completedChaps[btn2.id]
                        ? theme.fn.darken('#ef5152', 0.2)
                        : theme.fn.darken('#ABB2B9', 0.2),
                      color: '#ffeb99',
                    },
                  },
                })}
                onClick={() => {
                  navigate('/logistics/2');
                }}
              >
                {btn2.id}
              </Button>
            </HoverCard.Target>
            <HoverCard.Dropdown>
              <Text fw={500} size="sm">
                Here are some logistical information regarding course schedules
                and required softwares.
              </Text>
            </HoverCard.Dropdown>
          </HoverCard>
        </div>
        <div className="Section-3-btn">
          <Text fw={600} c="white" ta="left">
            {btn3.name}
          </Text>
          <HoverCard width={280} withArrow shadow="md" closeDelay={200}>
            <HoverCard.Target>
              <Button
                id={3}
                radius={'xl'}
                styles={(theme) => ({
                  root: {
                    backgroundColor: completedChaps[btn3.id]
                      ? '#ef5152'
                      : '#ABB2B9',
                    border: 0,
                    height: 33,
                    paddingLeft: 13,
                    paddingRight: 13,

                    '&:hover': {
                      backgroundColor: completedChaps[btn3.id]
                        ? theme.fn.darken('#ef5152', 0.2)
                        : theme.fn.darken('#ABB2B9', 0.2),
                      color: '#ffeb99',
                    },
                  },
                })}
                onClick={() => {
                  navigate('/general-ref/3');
                }}
              >
                {btn3.id}
              </Button>
            </HoverCard.Target>
            <HoverCard.Dropdown>
              <Text fw={500} size="sm">
                Here are some recommended resources and common conventions that
                all bootcampers should note!
              </Text>
            </HoverCard.Dropdown>
          </HoverCard>
        </div>
        <div className="Section-4-btn">
          <Text fw={600} c="white" ta="left">
            {btn4.name}
          </Text>
          <HoverCard width={280} withArrow shadow="md" closeDelay={200}>
            <HoverCard.Target>
              <Button
                id={4}
                radius={'xl'}
                styles={(theme) => ({
                  root: {
                    backgroundColor: completedChaps[btn4.id]
                      ? '#ef5152'
                      : '#ABB2B9',
                    border: 0,
                    height: 33,
                    paddingLeft: 13,
                    paddingRight: 13,
                    color: '#fff',

                    '&:hover': {
                      backgroundColor: completedChaps[btn4.id]
                        ? theme.fn.darken('#ef5152', 0.2)
                        : theme.fn.darken('#ABB2B9', 0.2),
                      color: '#ffeb99',
                    },
                  },
                })}
                onClick={() => {
                  navigate('/foundations/4');
                }}
              >
                {btn4.id}
              </Button>
            </HoverCard.Target>
            <HoverCard.Dropdown>
              <Text fw={500} size="sm">
                Module covers languages and tools we will need across Coding
                Bootcamp and as a software engineer.
              </Text>
            </HoverCard.Dropdown>
          </HoverCard>
        </div>
        <div className="Section-5-btn">
          <HoverCard
            position="top"
            width={280}
            withArrow
            shadow="md"
            closeDelay={200}
          >
            <HoverCard.Target>
              <Button
                id={5}
                radius={'xl'}
                styles={(theme) => ({
                  root: {
                    backgroundColor: completedChaps[btn5.id]
                      ? '#ef5152'
                      : '#ABB2B9',
                    border: 0,
                    height: 33,
                    paddingLeft: 13,
                    paddingRight: 13,
                    color: '#fff',

                    '&:hover': {
                      backgroundColor: completedChaps[btn5.id]
                        ? theme.fn.darken('#ef5152', 0.2)
                        : theme.fn.darken('#ABB2B9', 0.2),
                      color: '#ffeb99',
                    },
                  },
                })}
                onClick={() => {
                  navigate('/frontend/5');
                }}
              >
                {btn5.id}
              </Button>
            </HoverCard.Target>
            <HoverCard.Dropdown>
              <Text fw={500} size="sm">
                Welcome to front end engineering. We will develop modern
                frontend web applications using HTML, CSS, JS and React.
              </Text>
            </HoverCard.Dropdown>
          </HoverCard>
          <Text fw={600} c="white" ta="left">
            {btn5.name}
          </Text>
        </div>
        <div className="Section-6-btn">
          <Text fw={600} c="white" ta="left">
            {btn6.name}
          </Text>
          <HoverCard width={280} withArrow shadow="md" closeDelay={200}>
            <HoverCard.Target>
              <Button
                id={6}
                radius={'xl'}
                styles={(theme) => ({
                  root: {
                    backgroundColor: completedChaps[btn6.id]
                      ? '#ef5152'
                      : '#ABB2B9',
                    border: 0,
                    height: 33,
                    paddingLeft: 13,
                    paddingRight: 13,
                    color: '#fff',

                    '&:hover': {
                      backgroundColor: completedChaps[btn6.id]
                        ? theme.fn.darken('#ef5152', 0.2)
                        : theme.fn.darken('#ABB2B9', 0.2),
                      color: '#ffeb99',
                    },
                  },
                })}
                onClick={() => {
                  navigate('/full-stack/6');
                }}
              >
                {btn6.id}
              </Button>
            </HoverCard.Target>
            <HoverCard.Dropdown>
              <Text fw={500} size="sm">
                Welcome to full-stack engineering where apps have both a
                frontend and backend.
              </Text>
            </HoverCard.Dropdown>
          </HoverCard>
        </div>
        <div className="Section-7-btn">
          <HoverCard
            width={280}
            position="top"
            withArrow
            shadow="md"
            closeDelay={200}
          >
            <HoverCard.Target>
              <Button
                id={7}
                radius={'xl'}
                styles={(theme) => ({
                  root: {
                    backgroundColor: completedChaps[btn7.id]
                      ? '#ef5152'
                      : '#ABB2B9',
                    border: 0,
                    height: 33,
                    paddingLeft: 13,
                    paddingRight: 13,
                    color: '#fff',

                    '&:hover': {
                      backgroundColor: completedChaps[btn7.id]
                        ? theme.fn.darken('#ef5152', 0.2)
                        : theme.fn.darken('#ABB2B9', 0.2),
                      color: '#ffeb99',
                    },
                  },
                })}
                onClick={() => {
                  navigate('/backend/7');
                }}
              >
                {btn7.id}
              </Button>
            </HoverCard.Target>
            <HoverCard.Dropdown>
              <Text fw={500} size="sm">
                In Backend we will build a backend server that performs logic,
                stores and serves data to our frontends using the JavaScript
                server framework Express.js.
              </Text>
            </HoverCard.Dropdown>
          </HoverCard>
          <Text fw={600} c="white" ta="left">
            {btn7.name}
          </Text>
        </div>
        <div className="Section-8-btn">
          <HoverCard
            width={280}
            position="top"
            withArrow
            shadow="md"
            closeDelay={200}
          >
            <HoverCard.Target>
              <Button
                id={8}
                radius={'xl'}
                styles={(theme) => ({
                  root: {
                    backgroundColor: completedChaps[btn8.id]
                      ? '#ef5152'
                      : '#ABB2B9',
                    border: 0,
                    height: 33,
                    paddingLeft: 13,
                    paddingRight: 13,
                    color: '#fff',

                    '&:hover': {
                      backgroundColor: completedChaps[btn8.id]
                        ? theme.fn.darken('#ef5152', 0.2)
                        : theme.fn.darken('#ABB2B9', 0.2),
                      color: '#ffeb99',
                    },
                  },
                })}
                onClick={() => {
                  navigate('/capstone');
                }}
              >
                {btn8.id}
              </Button>
            </HoverCard.Target>
            <HoverCard.Dropdown>
              <Text fw={500} size="sm">
                We've learned the foundational components of software systems
                and how to build full-stack web applications.
              </Text>
            </HoverCard.Dropdown>
          </HoverCard>
          <Text fw={600} c="white" ta="left">
            {btn8.name}
          </Text>
        </div>
        <div className="Section-9-btn">
          <Text fw={600} c="white" ta="left">
            {btn9.name}
          </Text>
          <HoverCard width={280} withArrow shadow="md" closeDelay={200}>
            <HoverCard.Target>
              <Button
                id={9}
                radius={'xl'}
                styles={(theme) => ({
                  root: {
                    backgroundColor: completedChaps[btn9.id]
                      ? '#ef5152'
                      : '#ABB2B9',
                    border: 0,
                    height: 33,
                    paddingLeft: 13,
                    paddingRight: 13,
                    color: '#fff',

                    '&:hover': {
                      backgroundColor: completedChaps[btn9.id]
                        ? theme.fn.darken('#ef5152', 0.2)
                        : theme.fn.darken('#ABB2B9', 0.2),
                      color: '#ffeb99',
                    },
                  },
                })}
                onClick={() => {
                  navigate('/algorithms');
                }}
              >
                {btn9.id}
              </Button>
            </HoverCard.Target>
            <HoverCard.Dropdown>
              <Text fw={500} size="sm">
                Algorithm interviews are the most common interview type for
                software engineering jobs, and typically require solving an
                algorithm problem in 30-45mins in a coding language of our
                choice.
              </Text>
            </HoverCard.Dropdown>
          </HoverCard>
        </div>
        <div className="Section-10-btn">
          <HoverCard
            width={280}
            position="top"
            withArrow
            shadow="md"
            closeDelay={200}
          >
            <HoverCard.Target>
              <Button
                id={10}
                radius={'xl'}
                styles={(theme) => ({
                  root: {
                    backgroundColor: completedChaps[btn10.id]
                      ? '#ef5152'
                      : '#ABB2B9',
                    border: 0,
                    height: 33,
                    paddingLeft: 11,
                    paddingRight: 11,
                    color: '#fff',

                    '&:hover': {
                      backgroundColor: completedChaps[btn10.id]
                        ? theme.fn.darken('#ef5152', 0.2)
                        : theme.fn.darken('#ABB2B9', 0.2),
                      color: '#ffeb99',
                    },
                  },
                })}
                onClick={() => {
                  navigate('/interview-prep');
                }}
              >
                {btn10.id}
              </Button>
            </HoverCard.Target>
            <HoverCard.Dropdown>
              <Text fw={500} size="sm">
                The Interview Prep Module provides a template for the job
                application process.
              </Text>
            </HoverCard.Dropdown>
          </HoverCard>
          <Text fw={600} c="white" ta="left">
            {btn10.name}
          </Text>
        </div>
      </Group>
    </>
  );
}

export default MainMap;
