import React from 'react';
import starpic from '../../images/empty-map.png';
import DisplayMarkdown from '../DisplayMarkdown';
import { useState, useEffect } from 'react';
import { Button, Group, Text, Image, Title } from '@mantine/core';

import MarkCompleteBtn from '../MarkCompleteBtn';
import '../css/Frontend.css';
import axios from 'axios';
import { BACKEND_URL } from '../../constants.js';
import { useParams } from 'react-router-dom';
import { openModal } from '@mantine/modals';
import { set } from 'firebase/database';
import ModelTitle from '../ModelTitle';
import { useAuth } from '../AuthContext';
import ChapterPosts from '../ChapterPosts';
import GitHubSubmission from '../GitHubSubmission';

function Welcome() {
  const [opened, setOpened] = useState(false);
  const [btn1, setBtn1] = useState('');
  const [btn2, setBtn2] = useState('');

  const { cadetInfo } = useAuth();

  const [completedChaps, setCompletedChaps] = useState({});

  const { sectionId } = useParams();
  const [markCompleted, setMarkCompleted] = useState();

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/chapters/total-chapters?sectionId=${sectionId}`
        );

        console.log('chapters', response.data);
        console.log(cadetInfo);

        setBtn1(response.data[0]);
        setBtn2(response.data[1]);

        const response2 = await axios.get(
          `${BACKEND_URL}/cadetChapters/progress-status?cadetId=${cadetInfo.id}`
        );
        console.log('res2', response2.data);
        let chapsCompleted = {};

        for (let i = 0; i < response2.data.length; i++) {
          // console.log('chaptId', response2.data[i].chapterId);
          chapsCompleted[response2.data[i].chapterId] = true;
        }

        setCompletedChaps(chapsCompleted);
      } catch (err) {
        console.log(err.response.data);
      }
    };
    // sectId();
    fetchChapters();
  }, [cadetInfo, sectionId, markCompleted]);

  const handleClick = (id) => {
    axios
      .post(`${BACKEND_URL}/cadetChapters`, {
        cadetId: Number(cadetInfo.id),
        chapterId: Number(id),
        sectionId: Number(sectionId),
        completed: false,
      })
      .then((res) => {
        console.log('Chapter data created');
        console.log('cadetId', cadetInfo.id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCreateSubmissionData = (id) => {
    axios
      .post(`${BACKEND_URL}/gitHubSubmissions`, {
        cadetId: Number(cadetInfo.id),
        chapterId: Number(id),
        repoUrl: '',
      })
      .then((res) => {
        console.log('submission data created');
        console.log('cadetId', cadetInfo.id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = (id) => {
    axios
      .put(`${BACKEND_URL}/cadetChapters`, {
        cadetId: Number(cadetInfo.id),
        chapterId: Number(id),
        sectionId: Number(sectionId),
      })
      .then((res) => {
        console.log('resdata:', res.data);
        console.log('marked complete');
        setMarkCompleted(id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Title order={3} color="yellow">
        Section: Welcome to Rocket
      </Title>
      <Image className="star-pic" src={starpic} />
      {/* <div style={{ height: 800, marginLeft: 300, paddingTop: 40 }}>
        <Image height={900} src={starpic} />
      </div> */}
      <Group position="center">
        <div className="Sect1-Chapter-1-btn">
          <ModelTitle id={btn1.name} />
          <Button
            id={1}
            radius={'xl'}
            styles={(theme) => ({
              root: {
                backgroundColor: completedChaps[btn1.id] ? 'blue' : 'gray',
                border: 0,
                height: 33,
                paddingLeft: 13,
                paddingRight: 13,

                '&:hover': {
                  backgroundColor: theme.fn.darken('#00acee', 0.2),
                },
              },
            })}
            onClick={() => {
              handleClick(btn1.id);
              openModal({
                title: 'Welcome to BootCamp!',
                size: '55%',
                overflow: 'inside',

                children: (
                  <>
                    <DisplayMarkdown markdown={btn1.markdownUrl} />
                    <br />
                    <ChapterPosts chapter={btn1.id} cadet={cadetInfo} />

                    <MarkCompleteBtn
                      completedChaps={completedChaps[btn1.id]}
                      id={btn1.id}
                      handleSubmit={handleSubmit}
                    />
                  </>
                ),
              });
            }}
          >
            {btn1.chapterIndex}
          </Button>
        </div>
      </Group>
    </>
  );
}

export default Welcome;
