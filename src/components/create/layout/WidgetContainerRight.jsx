import React from 'react';
import { Container } from 'semantic-ui-react';
import DynamicWidget from '../DynamicWidget';

const ContainerExampleContainer = ({ firstName, logoUrl }) => (
  <Container className="widgetContainer">
    <DynamicWidget title={firstName} logo={logoUrl} />
  </Container>
);

export default ContainerExampleContainer;
