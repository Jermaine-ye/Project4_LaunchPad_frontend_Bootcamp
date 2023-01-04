import React from 'react';
import { useState, useEffect } from 'react';
import { BACKEND_URL } from '../constants.js';
import { Button, Text, createStyles } from '@mantine/core';
import '../Components/css/CadetChaptProgress.css';
import SLDashboardlinks from './SLDashboardlinks.js';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const useStyles = createStyles((theme) => ({
  button: {
    margin: theme.spacing.sm,
    backgroundColor: theme.colors.blue,
    cursor: 'auto',

    '&:hover': {
      backgroundColor: theme.colors.blue,
    },
  },
}));

const CadetChaptProgress = ({ cadetId, cadetName }) => {
  // const CadetChaptProgress = () => {
  //here map out the cadetChapters
  const [progress, setProgress] = useState([]);
  const [singleProgress, setSingleProgress] = useState([]);
  const [completedChaps, setCompletedChaps] = useState({});

  const { sectionId } = useParams();
  const { classes } = useStyles();

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        console.log(cadetId);
        const response = await axios.get(
          //ALL chapters completed by single cadet across whole BC
          `${BACKEND_URL}/cadetChapters/section-progress-status?cadetId=${cadetId}&sectionId=${sectionId}`
        );

        setProgress(response.data);

        console.log('omg', response.data);
      } catch (err) {
        console.log(err.response.data);
      }
    };

    fetchChapters();
  }, [cadetId, sectionId]);

  console.log('all progress', progress);

  let cadetProgressList = progress.map((chapter) => {
    return (
      <>
        {chapter.completed === true ? (
          <>
            <Button className={classes.button} radius="xl">
              {chapter.chapter.name}
            </Button>
          </>
        ) : (
          <>
            <Button className={classes.button} radius="xl">
              {chapter.chapter.name}
            </Button>
          </>
        )}
      </>
    );
  });

  return (
    <>
      <span>{cadetProgressList}</span>
    </>
  );
};

export default CadetChaptProgress;
