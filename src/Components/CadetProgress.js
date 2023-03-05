import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Text, Title, Paper, List } from '@mantine/core';
import { BACKEND_URL } from '../constants.js';
import { useParams } from 'react-router-dom';
import CadetChaptProgress from './CadetChaptProgress.js';
import '../Components/css/CadetChaptProgress.css';
import CadetSectionProgress from './CadetSectionProgress.js';
import SLDashboardlinks from './SLDashboardlinks.js';

const CadetProgress = () => {
  const { sectionId } = useParams();
  const [cadets, setCadets] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCadetProgress = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/cadets`);

        console.log('all cadets info', response.data);
        setCadets(response.data);
      } catch (err) {
        console.log(err.response.data);
      }
    };

    fetchCadetProgress();
  }, []);

  return (
    <div className="progress-list-paper">
      <Paper className="chapter-progress-list">
        <SLDashboardlinks />

        <br />
        <br />

        {sectionId ? (
          <List type="ordered" withPadding>
            <Title fw={700} order={2} underline border color="#0B7285">
              = ALL CADET CHAPTER PROGRESS =
            </Title>
            <br />
            <Text fz="lg" fw={500}>
              Current Section: {sectionId}
            </Text>
            <br />
            {cadets?.map((cadet) => (
              <div className="individual-chapter-progress-list">
                <span className="cadet-names">{cadet.name}</span>
                <span className="cadet-progress-map">
                  <CadetChaptProgress cadetId={cadet.id} key={cadet.id} />
                </span>
              </div>
            ))}
          </List>
        ) : (
          <List type="ordered" withPadding>
            <Title fw={700} order={2} underline border color="#0B7285">
              = ALL CADET SECTION PROGRESS =
            </Title>
            <br />

            {cadets?.map((cadet) => (
              <div className="individual-chapter-progress-list">
                <span className="cadet-names">{cadet.name}</span>
                <span className="cadet-progress-map">
                  <CadetSectionProgress cadetId={cadet.id} key={cadet.id} />
                </span>
              </div>
            ))}
          </List>
        )}
        <Button
          className="navigate-btn"
          variant="outline"
          color="teal"
          styles={(theme) => ({
            root: {
              '&:hover': {
                backgroundColor: theme.fn.darken('#38D9A9', 0.2),
                color: '#FFF',
              },
            },
          })}
          onClick={() => navigate('/main-map')}
        >
          Back To All Sections
        </Button>
        <br />
        <br />
        <br />
      </Paper>
    </div>
  );
};

export default CadetProgress;
