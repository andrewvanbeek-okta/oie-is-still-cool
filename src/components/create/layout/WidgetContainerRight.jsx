import React from 'react';
import { Container } from 'semantic-ui-react';
import DynamicWidget from '../DynamicWidget';

const ContainerExampleContainer = ({ firstName, logoUrl, socialAuthProviders, customColor, regi }) => {
  console.log(customColor);
  return (
    <Container className="widgetContainer">
      <DynamicWidget title={firstName} logo={logoUrl} socialAuthProviders={socialAuthProviders} customColor={customColor} regi={regi} />
    </Container>
  );
};

export default ContainerExampleContainer;
