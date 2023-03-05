import React from 'react';
import { useState, useEffect } from 'react';
import { Progress, Title } from '@mantine/core';
import { BACKEND_URL } from '../constants.js';
import { useAuth } from './AuthContext';
import axios from 'axios';

const ProgressBar = () => {
  const [sectionProgress, setSectionProgress] = useState('');
  const [numOfSection, setNumOfSection] = useState(10);
  const { cadetInfo } = useAuth();

  useEffect(() => {
    const fetchCompleted = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/cadetSections/completed-progress-status?cadetId=${cadetInfo.id}`
        );

        console.log('section progress', response.data);
        setSectionProgress(response.data.length);
      } catch (err) {
        console.log(err.response.data);
      }
    };
    fetchCompleted();
  }, []);

  const sectionProgressNum = (sectionProgress / numOfSection) * 100;

  const sectionProgressLabel = Number(sectionProgressNum).toFixed() + '%';

  return (
    <>
      <Title order={6}>Bootcamp Progress:</Title>
      <Progress
        className="Bootcamp-bar"
        color="pink"
        ml="sm"
        mr="sm"
        radius="xl"
        size={20}
        value={sectionProgressNum}
        label={sectionProgressLabel}
      />
      <br />
    </>
  );
};

export default ProgressBar;
