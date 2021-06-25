/* eslint-disable */
import React from 'react';
import { Container } from 'semantic-ui-react';
import DropdownSteps from '../steps/DropdownSteps';

const ContainerExampleContainer = ({ handleChangeToCustomTitle, handleLogoUrl, handleSocialAuth, handleCustomColor, handleReg }) => {
  console.log(handleCustomColor)
  return (
  <Container className="widgetContainer">
    <DropdownSteps handleChangeToCustomTitle={handleChangeToCustomTitle} handleLogoUrl={handleLogoUrl} handleSocialAuth={handleSocialAuth} handleCustomColor={handleCustomColor} handleReg={handleReg}/>
  </Container>
  );
};

export default ContainerExampleContainer;
