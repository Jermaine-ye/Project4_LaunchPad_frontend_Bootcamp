import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@mantine/core';
import { BACKEND_URL } from '../constants';
import axios from 'axios';
import { RichTextEditor } from '@mantine/rte';
// import { RichTextEditor } from '@mantine/tiptap';
import { showNotification } from '@mantine/notifications';
import { closeModal } from '@mantine/modals';
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from 'firebase/storage';
import { storage } from '../firebase';

const UPLOAD_IMAGES_FOLDER_NAME = 'postImageUploads';

const SLEditPost = (props) => {
  const [value, onChange] = useState(props.post.content);
  const [post, setPost] = useState({
    sl: null,
    author: null,
    authorName: '',
    authorImage: '',
    chapterId: null,
    content: '',
  });

  console.log('props in EditPost', props);
  useEffect(() => {
    setPost({
      sl: props.post.sl,
      author: props.post.author,
      authorName: props.post.authorName,
      authorImage: props.post.authorImage,
      chapterId: props.post.chapterId,
      content: value,
    });
  }, [props.post, value]);

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

  const handleSubmit = (id) => {
    try {
      axios
        .put(`${BACKEND_URL}/posts/${id}`, {
          ...post,
        })
        .then(() => {
          showNotification({
            message: 'Post edited!',
            color: 'orange',
          });
          setPost({
            sl: null,
            author: null,
            authorName: '',
            authorImage: '',
            chapterId: null,
            content: '',
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
        id="rte"
        value={value}
        onChange={onChange}
        onImageUpload={handleImageUpload}
        placeholder="lalala"
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
          onClick={() => {
            handleSubmit(props.post.id);
            closeModal('slEdit');
          }}
        >
          Save
        </Button>
      )}
    </div>
  );
};

export default SLEditPost;
