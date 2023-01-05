import React from 'react';
import { useState, useEffect } from 'react';
import { BACKEND_URL } from '../constants.js';
import { Button, Text, Title } from '@mantine/core';
import '../Components/css/CadetChaptProgress.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CadetSectionProgress = ({ cadetId }) => {
  //here map out the cadetChapters
  const [progress, setProgress] = useState([]);
  const [singleProgress, setSingleProgress] = useState([]);
  const [markCompleted, setMarkCompleted] = useState();
  const [completedSects, setCompletedSects] = useState({});
  const { sectionId } = useParams();

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await axios.get(
          //ALL chapters completed by single cadet across whole BC
          `${BACKEND_URL}/cadetSections/progress-status?cadetId=${cadetId}`
        );

        setProgress(response.data);
      } catch (err) {
        console.log(err.response.data);
      }
    };

    fetchSections();

    // sectId();
  }, [markCompleted]);

  let allSectionProgress = progress.map((section) => {
    return (
      <>
        {section.completed === true ? (
          <>
            <Button className="section-btn" color="green">
              {section.sectionId}
              {section.completed}
            </Button>
          </>
        ) : (
          <>
            {/* <Button className="section-btn" color="gray">
              {section.sectionId}
              {section.completed}
            </Button> */}
          </>
        )}
      </>
    );
  });

  console.log('all section progress', progress);

  return <span>{allSectionProgress}</span>;
};

export default CadetSectionProgress;
