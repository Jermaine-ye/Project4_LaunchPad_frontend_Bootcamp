import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@mantine/core";
import { BACKEND_URL } from "../constants";
import axios from "axios";
import { RichTextEditor } from "@mantine/rte";
import {
  getDownloadURL,
  ref,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
import { storage } from "../firebase";
import { closeModal } from "@mantine/modals";

const UPLOAD_IMAGES_FOLDER_NAME = "postImageUploads";

const EditPost = (props) => {
  const [value, onChange] = useState(props.post.content);
  const [post, setPost] = useState({
    author: null,
    authorName: "",
    authorImage: "",
    chapterId: null,
    content: "",
  });

  console.log("props in EditPost", props);
  useEffect(() => {
    setPost({
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
        const fileRef = ref(
          storage,
          `${UPLOAD_IMAGES_FOLDER_NAME}/${file.name}`
        );
        uploadBytes(fileRef, file).then(() => {
          getDownloadURL(fileRef)
            .then((downloadUrl) => resolve(downloadUrl))
            .catch(() => reject(new Error("Upload failed")));
        });
      }),
    []
  );

  const handleSubmit = (id) => {
    // event.preventDefault();
    axios
      .put(`${BACKEND_URL}/posts/${id}`, {
        ...post,
      })
      .then(() => {
        setPost({
          author: null,
          authorName: "",
          authorImage: "",
          chapterId: null,
          content: "",
        });
        onChange("");
      });
  };

  return (
    <div>
      <RichTextEditor
        id="rte"
        value={value}
        onChange={onChange}
        onImageUpload={handleImageUpload}
        placeholder="Post your messages here"
      />

      {value === "<p><br></p>" ? (
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
            closeModal("edit");
          }}
        >
          Save
        </Button>
      )}
    </div>
  );
};

export default EditPost;
