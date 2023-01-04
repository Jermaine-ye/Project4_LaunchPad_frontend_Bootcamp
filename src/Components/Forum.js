import React from 'react';
import { useState, useEffect } from 'react';
import { Textarea, Button, Paper, Grid, Title } from '@mantine/core';
import { BACKEND_URL } from '../constants.js';
import axios from 'axios';
import '../Components/css/Forum.css';
import ForumNavlinks from './ForumNavlinks.js';
import ForumSection from './ForumSection.js';
import { useParams } from 'react-router-dom';
import ChapterPosts from './ChapterPosts.js';
import ForumChapter from './ForumChapter.js';

const Forum = () => {
  const [fileInputFile, setFileInputFile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [course, setCourse] = useState([]);

  const [titleInput, setTitleInput] = useState('');
  const [inputMessage, setInputMessage] = useState('');
  const [editCompleted, setEditCompleted] = useState('');
  const [color, setColor] = useState('gray');
  const [completed, setCompleted] = useState('');
  const [completedMat, setCompletedMat] = useState('');
  const [disabled, setDisabled] = useState(false);

  //useEffect to get all the available chapters and map into different links, each link will display available chapters in that component

  const [chapters, setChapters] = useState('');
  const { sectionId, chapterId } = useParams();

  useEffect(() => {
    const fetchSectionChapters = async () => {
      try {
        const response = await axios.get(
          //ALL chapters completed by single cadet across whole BC
          `${BACKEND_URL}/chapters/total-chapters?sectionId=${sectionId}`
        );

        setChapters(response.data);
      } catch (err) {
        console.log(err.response.data);
      }
    };

    fetchSectionChapters();
    console.log('section param', sectionId);
  }, [sectionId]);

  return (
    <div className="progress-list-paper">
      <Paper withBorder shadow="sm" className="fsectionlist-progress-list">
        <Grid>
          <Grid.Col span={3}>
            <div className="forum-sect-btn-list">
              <ForumNavlinks />
            </div>
          </Grid.Col>
          <Grid.Col span={8}>
            {chapterId ? (
              <ForumChapter />
            ) : (
              <Title order={3} color="yellow">
                =No Forum Chats=
              </Title>
            )}
          </Grid.Col>
        </Grid>
        <div className="chapter-list-btns">
          <ForumSection />
        </div>
      </Paper>
    </div>
  );
};
export default Forum;
