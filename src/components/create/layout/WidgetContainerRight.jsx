import React from 'react';
import { Container } from 'semantic-ui-react';
import DynamicWidget from '../DynamicWidget';

const ContainerExampleContainer = ({ firstName, logoUrl, socialAuthProviders }) => (
  <Container className="widgetContainer">
    <DynamicWidget title={firstName} logo={logoUrl} socialAuthProviders={socialAuthProviders} />
  </Container>
);

export default ContainerExampleContainer;
