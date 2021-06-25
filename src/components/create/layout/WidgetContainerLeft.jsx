import React from 'react';
import { Container } from 'semantic-ui-react';
import DropdownSteps from '../steps/DropdownSteps';

const ContainerExampleContainer = ({ handleChangeToCustomTitle }) => (
  <Container className="widgetContainer">
    <DropdownSteps handleChangeToCustomTitle={handleChangeToCustomTitle} />
  </Container>
);

export default ContainerExampleContainer;
