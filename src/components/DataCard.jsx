import { Card, Image } from 'semantic-ui-react';
import React from 'react';

const DataCard = (props) => {
  const { data } = props;
  const style = {
    margin: '5px',
  };

  return (
    <Card style={style}>
      <Image src={`${data.img}`} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{data.name}</Card.Header>
        <Card.Meta>{data.meta}</Card.Meta>
        <Card.Description>{data.description}</Card.Description>
      </Card.Content>
    </Card>
  );
};
export default DataCard;
