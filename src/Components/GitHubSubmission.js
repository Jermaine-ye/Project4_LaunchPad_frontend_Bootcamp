import React, { useState } from 'react';
import { TextInput, Button, Group, Box } from '@mantine/core';
import axios from 'axios';
import { BACKEND_URL } from '../constants';

const GitHubSubmission = ({ id, cadetId }) => {
  const [repoUrl, setRepoUrl] = useState('');

  const handleChange = (event) => {
    setRepoUrl(event.target.value);
  };

  const handleSubmit = () => {
    console.log('handleSubmit', id);
    axios
      .put(`${BACKEND_URL}/gitHubSubmissions`, {
        cadetId: Number(cadetId),
        chapterId: Number(id),
        repoUrl: String(repoUrl),
      })
      .then((res) => {
        console.log('resdata:', res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    setRepoUrl('SUBMITTED!');
  };

  return (
    <Box sx={{ maxWidth: 300 }} mx="left" mt="md">
      <TextInput
        label="GitHub Repo"
        placeholder="https://github.com/user/project-name"
        value={repoUrl}
        onChange={handleChange}
      />
      <Group position="left" mt="md">
        <Button radius="md" type="submit" onClick={handleSubmit}>
          Submit GitHub Repo
        </Button>
      </Group>
    </Box>
  );
};

export default GitHubSubmission;
