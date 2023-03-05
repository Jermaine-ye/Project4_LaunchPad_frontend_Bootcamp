import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createStyles, Button } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  button: {
    margin: theme.spacing.sm,
    marginTop: theme.spacing.xl,
    backgroundColor: theme.colors.yellow,

    '&:hover': {
      boxShadow: theme.shadows.md,
      backgroundColor: theme.colors.pink[5],
    },

    '&:focus': {
      boxShadow: theme.shadows.lg,
      backgroundColor: theme.colors.red[7],
    },
  },
}));

const SLDashboardlinks = () => {
  const navigate = useNavigate();
  const { classes } = useStyles();

  return (
    <div className="SLDashboard-links">
      <Button
        className={classes.button}
        id="btn1"
        onClick={() => {
          navigate('/main-map/1');
        }}
        ta="center"
      >
        Section 1
        <br />
        Welcome!
      </Button>
      <Button
        className={classes.button}
        id="btn2"
        onClick={() => navigate('/main-map/2')}
        ta="center"
      >
        Section 2
        <br />
        Logistics
      </Button>
      <Button
        className={classes.button}
        id="btn3"
        onClick={() => navigate('/main-map/3')}
        ta="center"
      >
        Section 3
        <br />
        General Reference
      </Button>
      <Button
        className={classes.button}
        id="btn4"
        onClick={() => navigate('/main-map/4')}
        ta="center"
      >
        Section 4
        <br />
        Foundations
      </Button>
      <Button
        className={classes.button}
        onClick={() => navigate('/main-map/5')}
        ta="center"
      >
        Section 5
        <br />
        Frontend
      </Button>
      <Button
        className={classes.button}
        onClick={() => navigate('/main-map/6')}
        ta="center"
      >
        Section 6
        <br />
        Full Stack
      </Button>
      <Button
        className={classes.button}
        onClick={() => navigate('/main-map/7')}
        ta="center"
      >
        Section 7
        <br />
        Backend
      </Button>
      <Button
        className={classes.button}
        onClick={() => navigate('/main-map/8')}
        ta="center"
      >
        Section 8
        <br />
        Capstone
      </Button>
      <Button
        className={classes.button}
        onClick={() => navigate('/main-map/9')}
        ta="center"
      >
        Section 9
        <br />
        Algorithms
      </Button>
      <Button
        className={classes.button}
        onClick={() => navigate('/main-map/10')}
        ta="center"
      >
        Section 10
        <br />
        Interview Prep
      </Button>
    </div>
  );
};

export default SLDashboardlinks;
