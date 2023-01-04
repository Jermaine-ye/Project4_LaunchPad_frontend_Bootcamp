import { useState, useEffect } from 'react';
import { Button, Group, Text, Image, Title } from '@mantine/core';
import starpic from '../../images/Frontend-map.png';
import MarkCompleteBtn from '../MarkCompleteBtn';
import '../css/Frontend.css';
import axios from 'axios';
import { BACKEND_URL } from '../../constants.js';
import DisplayMarkdown from '../DisplayMarkdown';
import { useParams } from 'react-router-dom';
import { openModal } from '@mantine/modals';
import { set } from 'firebase/database';
import ModelTitle from '../ModelTitle';
import { useAuth } from '../AuthContext';
import ChapterPosts from '../ChapterPosts';
import GitHubSubmission from '../GitHubSubmission';

function Frontend() {
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
  const [btn11, setBtn11] = useState('');

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
        setBtn3(response.data[2]);
        setBtn4(response.data[3]);
        setBtn5(response.data[4]);
        setBtn6(response.data[5]);
        setBtn7(response.data[6]);
        setBtn8(response.data[7]);
        setBtn9(response.data[8]);
        setBtn10(response.data[9]);
        setBtn11(response.data[10]);

        const response2 = await axios.get(
          `${BACKEND_URL}/cadetChapters/progress-status?cadetId=${cadetInfo.id}`
        );
        console.log('res2', response2.data);
        let chapsCompleted = {};

        for (let i = 0; i < response2.data.length; i++) {
          chapsCompleted[response2.data[i].chapterId] = true;
        }

        setCompletedChaps(chapsCompleted);
      } catch (err) {
        console.log(err.response.data);
      }
    };

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
        Section: Frontend
      </Title>
      <Image className="star-pic" src={starpic} />
      <Group position="center">
        <div className="Chapter-1-btn">
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
                title: 'FRONTEND',
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
        <div className="Chapter-2-btn">
          <Button
            id={2}
            radius={'xl'}
            styles={(theme) => ({
              root: {
                backgroundColor: completedChaps[btn2.id] ? 'blue' : 'gray',
                border: 0,
                height: 33,
                paddingLeft: 14,
                paddingRight: 14,

                '&:hover': {
                  backgroundColor: theme.fn.darken('#00acee', 0.2),
                },
              },
            })}
            onClick={() => {
              handleClick(btn2.id);
              openModal({
                title: 'HTML',
                size: '55%',
                overflow: 'inside',

                children: (
                  <>
                    <DisplayMarkdown markdown={btn2.markdownUrl} />
                    <ChapterPosts chapter={btn2.id} cadet={cadetInfo} />
                    <MarkCompleteBtn
                      completedChaps={completedChaps[btn2.id]}
                      id={btn2.id}
                      handleSubmit={handleSubmit}
                    />
                  </>
                ),
              });
            }}
          >
            {btn2.chapterIndex}
          </Button>
          <ModelTitle id={btn2.name} />
        </div>
        <div className="Chapter-3-btn">
          <ModelTitle id={btn3.name} />
          <Button
            id={3}
            radius={'xl'}
            styles={(theme) => ({
              root: {
                backgroundColor: completedChaps[btn3.id] ? 'blue' : 'gray',
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
              handleClick(btn3.id);
              openModal({
                title: 'CSS',
                size: '55%',
                overflow: 'inside',
                children: (
                  <>
                    <DisplayMarkdown markdown={btn3.markdownUrl} />
                    <ChapterPosts chapter={btn3.id} cadet={cadetInfo} />
                    <MarkCompleteBtn
                      completedChaps={completedChaps[btn3.id]}
                      id={btn3.id}
                      handleSubmit={handleSubmit}
                    />
                  </>
                ),
              });
            }}
          >
            {btn3.chapterIndex}
          </Button>
        </div>
        <div className="Chapter-4-btn">
          <Button
            id={4}
            radius={'xl'}
            styles={(theme) => ({
              root: {
                backgroundColor: completedChaps[btn4.id] ? 'blue' : 'gray',
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
              handleClick(btn4.id);
              openModal({
                title: 'LAYOUT',
                size: '55%',
                overflow: 'inside',
                children: (
                  <>
                    <DisplayMarkdown markdown={btn4.markdownUrl} />
                    <ChapterPosts chapter={btn4.id} cadet={cadetInfo} />
                    <MarkCompleteBtn
                      completedChaps={completedChaps[btn4.id]}
                      id={btn4.id}
                      handleSubmit={handleSubmit}
                    />
                  </>
                ),
              });
            }}
          >
            {btn4.chapterIndex}
          </Button>
          <ModelTitle id={btn4.name} />
        </div>
        <div className="Chapter-5-btn">
          <Button
            id={5}
            radius={'xl'}
            styles={(theme) => ({
              root: {
                backgroundColor: completedChaps[btn5.id] ? 'blue' : 'gray',
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
              handleClick(btn5.id);
              openModal({
                title: 'REACT',
                size: '55%',
                overflow: 'inside',
                children: (
                  <>
                    <DisplayMarkdown markdown={btn5.markdownUrl} />
                    <ChapterPosts chapter={btn5.id} cadet={cadetInfo} />
                    <MarkCompleteBtn
                      completedChaps={completedChaps[btn5.id]}
                      id={btn5.id}
                      handleSubmit={handleSubmit}
                    />
                  </>
                ),
              });
            }}
          >
            {btn5.chapterIndex}
          </Button>
          <ModelTitle id={btn5.name} />
        </div>
        <div className="Chapter-6-btn">
          <Text fw={600} c="white" ta="left">
            {btn6.name}
          </Text>
          {/* <ModalBtn
            completedChaps={completedChaps[btn6.id]}
            id={btn6.id}
            handleSubmit={handleSubmit}
            handleClick={handleClick}
            markdownUrl={btn6.markdownUrl}
            opened={opened}
            openModal={openModal}
          /> */}
          <Button
            id={6}
            radius={'xl'}
            styles={(theme) => ({
              root: {
                backgroundColor: completedChaps[btn6.id] ? 'blue' : 'gray',
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
              handleClick(btn6.id);
              handleCreateSubmissionData(btn6.id);
              openModal({
                opened: { opened },
                title: 'RECIPE SITE E1',
                size: '55%',
                overflow: 'inside',
                children: (
                  <>
                    <DisplayMarkdown markdown={btn6.markdownUrl} />
                    <ChapterPosts chapter={btn6.id} cadet={cadetInfo} />
                    <GitHubSubmission id={btn6.id} cadetId={cadetInfo.id} />
                    <MarkCompleteBtn
                      completedChaps={completedChaps[btn6.id]}
                      id={btn6.id}
                      handleSubmit={handleSubmit}
                    />
                  </>
                ),
              });
            }}
          >
            {btn6.chapterIndex}
          </Button>
        </div>
        <div className="Chapter-7-btn">
          <Button
            id={7}
            radius={'xl'}
            styles={(theme) => ({
              root: {
                backgroundColor: completedChaps[btn7.id] ? 'blue' : 'gray',
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
              handleClick(btn7.id);
              handleCreateSubmissionData(btn7.id);
              openModal({
                title: 'PORTFOLIO PAGE E2',
                size: '55%',
                overflow: 'inside',
                children: (
                  <>
                    <DisplayMarkdown markdown={btn7.markdownUrl} />
                    <ChapterPosts chapter={btn7.id} cadet={cadetInfo} />
                    <GitHubSubmission id={btn7.id} cadetId={cadetInfo.id} />
                    <MarkCompleteBtn
                      completedChaps={completedChaps[btn7.id]}
                      id={btn7.id}
                      handleSubmit={handleSubmit}
                    />
                  </>
                ),
              });
            }}
          >
            {btn7.chapterIndex}
          </Button>
          <ModelTitle id={btn7.name} />
        </div>
        <div className="Chapter-8-btn">
          <Button
            id={8}
            radius={'xl'}
            styles={(theme) => ({
              root: {
                backgroundColor: completedChaps[btn8.id] ? 'blue' : 'gray',
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
              handleClick(btn8.id);
              handleCreateSubmissionData(btn8.id);
              openModal({
                title: 'WORLD CLOCK E3',
                size: '55%',
                overflow: 'inside',
                children: (
                  <>
                    <DisplayMarkdown markdown={btn8.markdownUrl} />
                    <ChapterPosts chapter={btn8.id} cadet={cadetInfo} />
                    <GitHubSubmission id={btn8.id} cadetId={cadetInfo.id} />
                    <MarkCompleteBtn
                      completedChaps={completedChaps[btn8.id]}
                      id={btn8.id}
                      handleSubmit={handleSubmit}
                    />
                  </>
                ),
              });
            }}
          >
            {btn8.chapterIndex}
          </Button>
          <ModelTitle id={btn8.name} />
        </div>
        <div className="Chapter-9-btn">
          <Button
            id={9}
            radius={'xl'}
            styles={(theme) => ({
              root: {
                backgroundColor: completedChaps[btn9.id] ? 'blue' : 'gray',
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
              handleClick(btn9.id);
              handleCreateSubmissionData(btn9.id);
              openModal({
                title: 'HIGH CARD E4',
                size: '55%',
                overflow: 'inside',
                children: (
                  <>
                    <DisplayMarkdown markdown={btn9.markdownUrl} />
                    <ChapterPosts chapter={btn9.id} cadet={cadetInfo} />
                    <GitHubSubmission id={btn9.id} cadetId={cadetInfo.id} />
                    <MarkCompleteBtn
                      completedChaps={completedChaps[btn9.id]}
                      id={btn9.id}
                      handleSubmit={handleSubmit}
                    />
                  </>
                ),
              });
            }}
          >
            {btn9.chapterIndex}
          </Button>
          <ModelTitle id={btn9.name} />
        </div>
        <div className="Chapter-10-btn">
          <Button
            id={10}
            radius={'xl'}
            styles={(theme) => ({
              root: {
                backgroundColor: completedChaps[btn10.id] ? 'blue' : 'gray',
                border: 0,
                height: 35,
                paddingLeft: 14,
                paddingRight: 14,

                '&:hover': {
                  backgroundColor: theme.fn.darken('#00acee', 0.2),
                },
              },
            })}
            onClick={() => {
              handleClick(btn10.id);
              handleCreateSubmissionData(btn10.id);
              openModal({
                title: 'GUESS THE WORD E5',
                size: '55%',
                overflow: 'inside',
                children: (
                  <>
                    <DisplayMarkdown markdown={btn10.markdownUrl} />
                    <ChapterPosts chapter={btn10.id} cadet={cadetInfo} />
                    <GitHubSubmission id={btn10.id} cadetId={cadetInfo.id} />
                    <MarkCompleteBtn
                      completedChaps={completedChaps[btn10.id]}
                      id={btn10.id}
                      handleSubmit={handleSubmit}
                    />
                  </>
                ),
              });
            }}
          >
            {btn10.chapterIndex}
          </Button>
          <ModelTitle id={btn10.name} />
        </div>
        <div className="Chapter-11-btn">
          <Button
            id={11}
            radius={'xl'}
            styles={(theme) => ({
              root: {
                backgroundColor: completedChaps[btn11.id] ? 'blue' : 'gray',
                border: 0,
                height: 35,
                paddingLeft: 12,
                paddingRight: 12,

                '&:hover': {
                  backgroundColor: theme.fn.darken('#00acee', 0.2),
                },
              },
            })}
            onClick={() => {
              handleClick(btn11.id);
              handleCreateSubmissionData(btn11.id);
              openModal({
                title: 'PROJECT 1: FRONTEND',
                size: '55%',
                overflow: 'inside',
                children: (
                  <>
                    <DisplayMarkdown markdown={btn11.markdownUrl} />
                    <ChapterPosts chapter={btn11.id} cadet={cadetInfo} />
                    <GitHubSubmission id={btn11.id} cadetId={cadetInfo.id} />
                    <MarkCompleteBtn
                      completedChaps={completedChaps[btn11.id]}
                      id={btn11.id}
                      handleSubmit={handleSubmit}
                    />
                  </>
                ),
              });
            }}
          >
            {btn11.chapterIndex}
          </Button>
          <ModelTitle id={btn11.name} />
        </div>
      </Group>
    </>
  );
}

export default Frontend;
