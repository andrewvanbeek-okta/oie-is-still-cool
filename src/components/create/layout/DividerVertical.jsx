/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Divider, Grid, Segment } from 'semantic-ui-react';
import WidgetContainerRight from './WidgetContainerRight';
import WidgetContainerLeft from './WidgetContainerLeft';


const DividerVertical = () => {
  const [customTitle, setCustomTitle] = useState();
  const [logoUrl, setLogoUrl] = useState();
  const [socailAuthProviders, setSocailAuthProviders] = useState();
  const [widgetConfig, setWidgetConfig] = useState()

  const handleChangeToCustomTitle = (e) => {
    console.log("top parent")
    console.log("input value:", e);
    setCustomTitle(e);
    // widgetConfig.title = e
    // setWidgetConfig(widgetConfig)
  };

  const handleLogoUrl = (e) => {
    console.log("top parent")
    console.log("input value:", e);
    setLogoUrl(e)
    // widgetConfig.logoUrl = e
    // setWidgetConfig(widgetConfig)
  };

  const handleSocialAuth = (e) => {
    console.log("top parent")
    console.log("input value:", e);
    setSocailAuthProviders(e)
  }

  const style = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: '15%',
    padding: '0',
  };

  useEffect(async () => {
    console.log("woot")
    console.log(customTitle)
  }, [customTitle])

  return (
    <div id="widgetEditor" style={style} className="overlay">
      <Segment>
        <Grid columns={2} relaxed="very">
          <Grid.Column className="leftColumn">
            <WidgetContainerLeft handleChangeToCustomTitle={handleChangeToCustomTitle} handleLogoUrl={handleLogoUrl} handleSocialAuth={handleSocialAuth} />
          </Grid.Column>
          <Grid.Column className="rightColumn">
            <WidgetContainerRight firstName={customTitle} logoUrl={logoUrl} />
          </Grid.Column>
        </Grid>
        <Divider vertical>And</Divider>
      </Segment>
    </div>
  );
};

export default DividerVertical;
