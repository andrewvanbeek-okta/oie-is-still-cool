import React, { useState } from 'react';
import { Divider, Grid, Segment } from 'semantic-ui-react';
import WidgetContainerRight from './WidgetContainerRight';
import WidgetContainerLeft from './WidgetContainerLeft';

const DividerVertical = () => {
  const [firstName, setfirstName] = useState();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    setfirstName(e.target.value);
  };

  return (
    <div className="overlay">
      <Segment>
        <Grid columns={2} relaxed="very">
          <Grid.Column className="leftColumn">
            <WidgetContainerLeft handleSubmit={handleSubmit} />
            {/* <Input id="clickable" onChange={(e) => handleSubmit(e)} /> */}
          </Grid.Column>
          <Grid.Column className="rightColumn">
            <WidgetContainerRight firstName={firstName} />
          </Grid.Column>
        </Grid>
        <Divider vertical>And</Divider>
      </Segment>
    </div>
  );
};

export default DividerVertical;
