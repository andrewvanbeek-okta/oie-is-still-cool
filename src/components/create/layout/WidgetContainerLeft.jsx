import React from 'react';
import { Container } from 'semantic-ui-react';
import AccordionSteps from '../steps/AccordionSteps';

const ContainerExampleContainer = ({ handleSubmit }) => (
  <Container className="widgetContainer">
    <AccordionSteps handleSubmit={handleSubmit} />
  </Container>
);

export default ContainerExampleContainer;
