/* eslint-disable */
import React from 'react';
import { Container } from 'semantic-ui-react';
import DropdownSteps from '../steps/DropdownSteps';

const ContainerExampleContainer = ({ handleChangeToCustomTitle, handleLogoUrl, handleSocialAuth, handleCustomColor }) => {
  console.log(handleCustomColor)
  return (
  <Container className="widgetContainer">
    <DropdownSteps handleChangeToCustomTitle={handleChangeToCustomTitle} handleLogoUrl={handleLogoUrl} handleSocialAuth={handleSocialAuth} handleCustomColor={handleCustomColor}/>
  </Container>
  );
};

export default ContainerExampleContainer;
