import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Textarea, Button, TextInput, Card, Title, Text } from '@mantine/core';
import { BACKEND_URL } from '../constants.js';
import { SLPostBlock } from './SLPostBlock.js';
import { List } from '@mantine/core';
import SLPostForm from './SLPostForm.js';
import { useAuth } from './AuthContext';

import axios from 'axios';
import { connectStorageEmulator } from 'firebase/storage';
import './css/Forum.css';

const ForumChapter = () => {
  const [sections, setSections] = useState([]);
  const [slId, setSlId] = useState();
  const { chapterId } = useParams();
  const [posts, setPosts] = useState([]);
  const { slInfo } = useAuth();

  useEffect(() => {
    const getPosts = async () => {
      axios
        .get(`${BACKEND_URL}/posts`, {
          params: {
            chapterId: chapterId,
          },
        })
        .then((response) => {
          setPosts(response.data);
          console.log('what is in post', response.data);
        });
    };
    getPosts();
    setSlId(slInfo);
  }, [chapterId, posts]);

  const onPostUpdate = (post) => {
    setPosts((prevPosts) => {
      return [...prevPosts, post];
    });
  };

  const onPostDelete = (postId) => {
    setPosts(posts.filter((prevPost) => prevPost.id !== postId));
  };

  console.log('sl info', slInfo);
  return (
    <div className="post-list">
      <Title fw={700} order={2} underline border color="#0B7285">
        = Forum Discussions =
      </Title>

      <Text c="#1971C2" fz="lg" fw={500}>
        Current Chapter: {chapterId}
      </Text>
      <br />

      {posts.length > 0 ? (
        <Card
          className="post-background"
          shadow="sm"
          p="xl"
          radius="md"
          withBorder
        >
          <List type="ordered">
            {posts?.map((post) => (
              <SLPostBlock
                key={post.id}
                chapterId={post.chapterId}
                post={post}
                sl={slId}
                cadet={post.cadetId}
                onPostUpdate={onPostUpdate}
                onPostDelete={onPostDelete}
              />
            ))}
          </List>
          {/* <SLPostForm chapter={chapterId} onPostUpdate={onPostUpdate} /> */}
        </Card>
      ) : (
        <Title className="forum-null-msg" order={3} color="yellow">
          =No Forum Chats=
        </Title>
      )}

      <SLPostForm chapter={chapterId} onPostUpdate={onPostUpdate} />
    </div>
  );
};

export default ForumChapter;
