/* eslint-disable */
import React from 'react';
import { Container } from 'semantic-ui-react';
import DropdownSteps from '../steps/DropdownSteps';

const ContainerExampleContainer = ({ handleChangeToCustomTitle, handleLogoUrl, handleSocialAuth }) => (
  <Container className="widgetContainer">
    <DropdownSteps handleChangeToCustomTitle={handleChangeToCustomTitle} handleLogoUrl={handleLogoUrl} handleSocialAuth={handleSocialAuth} />
  </Container>
);

export default ContainerExampleContainer;
