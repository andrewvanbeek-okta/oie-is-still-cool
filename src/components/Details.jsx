/* eslint-disable */
import React from 'react';
import { withRouter, useParams } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import {
  Container,
  Header,
  Image,
  Label,
  Icon,
  Placeholder,
} from 'semantic-ui-react';

const Details = () => {
  const { id } = useParams();
  const { authState } = useOktaAuth();

  const containerStyle = {
    color: 'white',
    // border: '1px red solid',
    marginTop: '10rem',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    // background: 'maroon',
    padding: '1rem',
  };

  const headerStyle = {
    color: 'white',
    textAlign: 'center',
  };

  const imgStyle = {
    width: '50%',
    height: '50%',
  };

  const labelStyle = {
    fontSize: '1rem',
    margin: '1rem',
  };

  const paragraphStyle = {
    color: 'white',
  };

  const textAreaStyle = {
    width: '100%',
    height: '100%',
    resize: 'none',
    boxSizing: 'border-box',
    margin: '0',
    background: '#1c1c22',
    color: '#00b868',
    outline: 'none',
  };

  const data = {
    img: 'https://i.pinimg.com/originals/32/e2/41/32e2413585f1d2e0333c7dee3c4808bf.jpg',
    name: 'My Sign-in Design',
    meta: 'Created by Mark Vong',
    description: 'This design was inspired by all things fluffy and cute.',
    link: '#',
    code: '{title:"My Sign-in Design", author: "Mark Vong", code: "<html></html>"}',
  };

  return (
    authState.isAuthenticated && (
      <Container style={containerStyle}>
        <Header as="h1" style={headerStyle}>
          {data.name}
        </Header>
        <Image src={data.img} style={imgStyle} />
        <Label style={labelStyle}>
          <Icon name="user circle" /> {data.meta}
        </Label>
        <p>{data.description}</p>
        <textarea style={textAreaStyle}>{data.code}</textarea>
      </Container>
    )
  );
};
export default withRouter(Details);
