import React, { useState } from 'react';
import { Divider, Grid, Segment } from 'semantic-ui-react';
import WidgetContainerRight from './WidgetContainerRight';
import WidgetContainerLeft from './WidgetContainerLeft';

const DividerVertical = () => {
  const [customTitle, setCustomTitle] = useState();
  const handleChangeToCustomTitle = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    setCustomTitle(e.target.value);
  };

  return (
    <div className="overlay">
      <Segment>
        <Grid columns={2} relaxed="very">
          <Grid.Column className="leftColumn">
            <WidgetContainerLeft handleChangeToCustomTitle={handleChangeToCustomTitle} />
          </Grid.Column>
          <Grid.Column className="rightColumn">
            <WidgetContainerRight firstName={customTitle} />
          </Grid.Column>
        </Grid>
        <Divider vertical>And</Divider>
      </Segment>
    </div>
  );
};

export default DividerVertical;
