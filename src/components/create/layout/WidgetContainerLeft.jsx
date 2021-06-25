/* eslint-disable */
import React from 'react';
import { Container } from 'semantic-ui-react';
import DropdownSteps from '../steps/DropdownSteps';

const ContainerExampleContainer = ({ handleChangeToCustomTitle, handleLogoUrl }) => (
  <Container className="widgetContainer">
    <DropdownSteps handleChangeToCustomTitle={handleChangeToCustomTitle} handleLogoUrl={handleLogoUrl} />
  </Container>
);

export default ContainerExampleContainer;
