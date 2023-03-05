import React from 'react';
import { useState, useEffect } from 'react';
import { Button, createStyles } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../constants.js';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const useStyles = createStyles((theme) => ({
  button: {
    margin: theme.spacing.xs,
    backgroundColor: theme.colors.teal[6],

    '&:hover': {
      boxShadow: theme.shadows.md,
      backgroundColor: theme.colors.teal[7],
    },

    '&:focus': {
      boxShadow: theme.shadows.lg,
      backgroundColor: theme.colors.teal[9],
      color: theme.colors.yellow[3],
    },
  },
}));

const ForumSection = () => {
  const [chapters, setChapters] = useState([]);
  const navigate = useNavigate();
  const { sectionId } = useParams();
  const { classes } = useStyles();

  useEffect(() => {
    const fetchSectionChapters = async () => {
      try {
        const response = await axios.get(
          //ALL chapters completed by single cadet across whole BC
          `${BACKEND_URL}/chapters/total-chapters?sectionId=${sectionId}`
        );

        setChapters(response.data);
      } catch (err) {
        console.log(err.response.data);
      }
    };

    fetchSectionChapters();
    console.log('section param', sectionId);
  }, [sectionId]);

  return (
    <>
      {chapters?.map((chapter) => (
        <Button
          key={chapter.id}
          className={classes.button}
          color="teal"
          onClick={() => navigate(`/forum/${sectionId}/${chapter.id}`)}
        >
          {chapter.id}
          {'   '}
          {chapter.name}
        </Button>
      ))}
    </>
  );
};

export default ForumSection;
