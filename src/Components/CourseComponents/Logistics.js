import React from 'react';
import starpic from '../../images/empty-map.png';
import { Title, Table, Paper, Image, Group } from '@mantine/core';
import '../css/table.css';

const Logistics = () => {
  return (
    <div>
      <Group position="center">
        <Title order={1} color="yellow">
          Logistics
        </Title>
        <Image className="star-pic" src={starpic} />
      </Group>
    </div>
  );
};

export default Logistics;
