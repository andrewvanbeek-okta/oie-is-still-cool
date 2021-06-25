import React from 'react';
import { Container } from 'semantic-ui-react';
import DynamicWidget from '../DynamicWidget';

const ContainerExampleContainer = ({ firstName, logoUrl, socialAuthProviders, customColor }) => {
  console.log(customColor);
  return (
    <Container className="widgetContainer">
      <DynamicWidget title={firstName} logo={logoUrl} socialAuthProviders={socialAuthProviders} customColor={customColor} />
    </Container>
  );
};

export default ContainerExampleContainer;
