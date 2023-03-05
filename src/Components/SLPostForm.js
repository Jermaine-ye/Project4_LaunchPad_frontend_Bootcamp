import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@mantine/core';
import { BACKEND_URL } from '../constants';
import axios from 'axios';
import { RichTextEditor } from '@mantine/rte';
import { useAuth } from './AuthContext';
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from 'firebase/storage';
import { storage } from '../firebase';
const UPLOAD_IMAGES_FOLDER_NAME = 'postImageUploads';

const SLPostForm = ({ sl, onPostUpdate, chapter }) => {
  const { slInfo } = useAuth();
  const [value, onChange] = useState('<p><br></p>');
  const [post, setPost] = useState({
    sl: null,
    author: null,
    authorName: '',
    authorImage: '',
    chapterId: null,
    content: '',
    createdAt: null,
  });

  useEffect(() => {
    setPost({
      sl: slInfo.id,
      author: null,
      authorName: slInfo.name,
      authorImage: slInfo.photoLink,
      chapterId: chapter,
      content: value,
      createdAt: new Date().toLocaleString(),
    });
  }, [value, slInfo.id, slInfo.name, slInfo.photoLink, chapter]);

  const handleImageUpload = useCallback(
    (file) =>
      new Promise((resolve, reject) => {
        const fileRef = storageRef(
          storage,
          `${UPLOAD_IMAGES_FOLDER_NAME}/${file.name}`
        );
        uploadBytes(fileRef, file).then(() => {
          getDownloadURL(fileRef)
            .then((downloadUrl) => resolve(downloadUrl))
            .catch(() => reject(new Error('Upload failed')));
        });
      }),
    []
  );

  console.log('post content', post.content);
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`${BACKEND_URL}/posts`, {
        ...post,
      })
      .then((res) => {
        console.log('in handle submit', res);
        onPostUpdate(res.data);
        setPost({
          sl: null,
          authorName: '',
          authorImage: '',
          chapterId: null,
          content: '',
          createdAt: null,
        });
        onChange('');
      });
  };
  console.log(value);

  return (
    <div>
      <RichTextEditor
        id="rte"
        value={value}
        onChange={onChange}
        onImageUpload={handleImageUpload}
        placeholder="Post your messages here"
      />

      {value === '<p><br></p>' ? (
        <Button
          variant="filled"
          color="tan"
          size="xs"
          mt="sm"
          radius="sm"
          disabled
        >
          Submit
        </Button>
      ) : (
        <Button
          variant="filled"
          color="tan"
          size="xs"
          mt="sm"
          radius="sm"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      )}
      <br />
      <br />
    </div>
  );
};

export default SLPostForm;
