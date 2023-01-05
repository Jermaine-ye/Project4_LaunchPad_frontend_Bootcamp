import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BACKEND_URL } from '../constants.js';
import { PostBlock } from './PostBlock.js';
import { List } from '@mantine/core';
import PostForm from './PostForm.js';

const ChapterPosts = (props) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      axios
        .get(`${BACKEND_URL}/posts`, {
          params: {
            chapterId: props.chapter,
          },
        })
        .then((response) => {
          setPosts(response.data);
          console.log('inside post', response.data);
        });
    };
    getPosts();
  }, [props.chapter]);

  const onPostUpdate = (post) => {
    setPosts((prevPosts) => {
      return [...prevPosts, post];
    });
  };

  const onPostDelete = (postId) => {
    setPosts(posts.filter((prevPost) => prevPost.id !== postId));
  };

  return (
    <div>
      <br />
      <br />
      <List type="ordered" withPadding>
        {posts.map((post) => (
          <PostBlock
            key={post.id}
            cadet={props.cadet}
            chapter={props.chapter}
            post={post}
            onPostUpdate={onPostUpdate}
            onPostDelete={onPostDelete}
          />
        ))}
      </List>

      <PostForm
        chapter={props.chapter}
        cadet={props.cadet}
        onPostUpdate={onPostUpdate}
      />

      <br />
    </div>
  );
};

export default ChapterPosts;
