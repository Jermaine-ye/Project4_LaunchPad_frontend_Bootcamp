import { useState, useEffect } from 'react';
import { Modal, Button, Group } from '@mantine/core';
import DisplayMarkdown from './DisplayMarkdown';
import axios from 'axios';

function ModalDemo() {
  const [opened, setOpened] = useState(false);
  const [frontend, setFrontend] = useState({});

  useEffect(() => {
    const getFrontend = async () => {
      axios.get('http://localhost:8080/chapters/15').then((response) => {
        setFrontend(response.data);
      });
    };
    getFrontend();
  }, []);

  console.log(frontend);

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Introduce yourself!"
        centered
        size="xl"
      >
        <DisplayMarkdown markdown={frontend.markdownUrl} />
      </Modal>

      <Group position="center">
        <Button onClick={() => setOpened(true)}>Layout</Button>
      </Group>
    </>
  );
}

export default ModalDemo;
