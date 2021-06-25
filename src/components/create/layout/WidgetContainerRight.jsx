import React from 'react';
import { Container } from 'semantic-ui-react';
import DynamicWidget from '../DynamicWidget';

const ContainerExampleContainer = ({ firstName }) => (
  <Container className="widgetContainer">
    <DynamicWidget firstName={firstName} />
  </Container>
);

export default ContainerExampleContainer;
