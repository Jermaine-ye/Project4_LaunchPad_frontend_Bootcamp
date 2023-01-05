import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@mantine/core';
import { BACKEND_URL } from '../constants';
import axios from 'axios';
import { RichTextEditor } from '@mantine/rte';
import { showNotification } from '@mantine/notifications';
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from 'firebase/storage';
import { storage } from '../firebase';

const UPLOAD_IMAGES_FOLDER_NAME = 'postImageUploads';

const PostForm = ({ chapter, cadet, onPostUpdate }) => {
  const [value, onChange] = useState('<p><br></p>');
  const [post, setPost] = useState({
    author: null,
    authorName: '',
    authorImage: '',
    chapterId: null,
    content: '',
    createdAt: null,
  });

  useEffect(() => {
    setPost({
      author: cadet.id,
      authorName: cadet.name,
      authorImage: cadet.photoLink,
      chapterId: chapter,
      content: value,
      createdAt: new Date().toLocaleString(),
    });
  }, [value, cadet.id, cadet.name, cadet.photoLink, chapter]);

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

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      axios
        .post(`${BACKEND_URL}/posts`, {
          ...post,
        })
        .then((res) => {
          showNotification({
            message: 'Post Created!',
            color: 'teal',
          });
          onPostUpdate(res.data);
          setPost({
            author: null,
            authorName: '',
            authorImage: '',
            chapterId: null,
            content: '',
            createdAt: null,
          });
          onChange('');
        });
    } catch (error) {
      showNotification({
        message: error.message,
        color: 'red',
      });
    }
  };

  return (
    <div>
      <RichTextEditor
        styles={{ overflow: 'auto' }}
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
          size="sm"
          mt="md"
          radius="md"
          disabled
        >
          Submit
        </Button>
      ) : (
        <Button
          variant="filled"
          color="tan"
          size="sm"
          mt="md"
          radius="md"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      )}
    </div>
  );
};

export default PostForm;
