import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import { Card, Text, Grid, Container, Image, Paper } from '@mantine/core';

export default function TimeDisplay() {
  // const [quote, setQuote] = useState('');
  // const [author, setAuthor] = useState('');
  // const [photo, setPhoto] = useState('');
  const [date, setDate] = useState(new Date());

  const weekday = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const d = new Date();
  let day = weekday[d.getDay()];

  let tick = () => {
    setDate(new Date());
  };

  useEffect(() => {
    let timerID = setInterval(() => tick(), 1000);

    return function cleanup() {
      clearInterval(timerID);
    };
  });

  // useEffect(() => {
  //   axios
  //     .get(`https://api.quotable.io/random`)

  //     .then((response) => {
  //       console.log('res', response);
  //       setQuote(response.data.content);
  //       setAuthor(response.data.author);
  //     });

  //   axios
  //     .get(
  //       `https://api.unsplash.com/photos/random/?topics=happy&client_id=${process.env.REACT_APP_APP_ACCESS_KEY}`
  //     )

  //     .then((photo) => {
  //       console.log('res', photo);
  //       console.log('photos: ', photo.data);

  //       setPhoto(photo.data.urls.regular);
  //     });
  // }, []);

  return (
    <Container className="Time-header" size={400} px={50}>
      <Card shadow="sm" p="xl" radius="md" withBorder>
        <Text ta="center" weight={600} size={14} mt="md">
          {date.toLocaleTimeString('en-GB')}
          <br />
          {date.toLocaleDateString('en-GB')}
          <br />
          {day}
        </Text>
        <br />
      </Card>
    </Container>
  );
}
