/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Divider, Grid, Segment, Button } from 'semantic-ui-react';
import WidgetContainerRight from './WidgetContainerRight';
import WidgetContainerLeft from './WidgetContainerLeft';
import gql from 'graphql-tag'
import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync'


const DividerVertical = () => {
  const [customTitle, setCustomTitle] = useState();
  const [logoUrl, setLogoUrl] = useState();
  const [socialAuthProviders, setSocialAuthProviders] = useState();
  const [regi, setReg] = useState();
  const [widgetConfig, setWidgetConfig] = useState();
  const [customColor, setCustomColor] = useState();


  const handleChangeToCustomTitle = (e) => {
    // console.log("top parent")
    // console.log("input value:", e);
    setCustomTitle(e);
    // widgetConfig.title = e
    // setWidgetConfig(widgetConfig)
    // console.log("my title", e);
  };

  const handleLogoUrl = (e) => {
    // console.log("top parent")
    // console.log("input value:", e);
    setLogoUrl(e)
    // widgetConfig.logoUrl = e
    // setWidgetConfig(widgetConfig)
  };

  const handleSocialAuth = (e) => {
    // console.log("top parent")
    // console.log("input value:", e);
    setSocialAuthProviders(socialAuthProviders.concat(...e))
    // console.log("my social providers", e)
  }

  const handleReg = (e) => {
    console.log("Reg value: ", e);
    setReg(!e)
  }

  const handleCustomColor = (hex) => {
    console.log("custom color is: ", hex)
    setCustomColor(hex);
  };

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
            <WidgetContainerLeft handleChangeToCustomTitle={handleChangeToCustomTitle} handleLogoUrl={handleLogoUrl} handleSocialAuth={handleSocialAuth} handleCustomColor={handleCustomColor} handleReg={handleReg}/>
          </Grid.Column>
          <Grid.Column className="rightColumn">
            <WidgetContainerRight firstName={customTitle} logoUrl={logoUrl} socialAuthProviders={socialAuthProviders} customColor={customColor} handleCustomColor={handleCustomColor} handleReg={handleReg} regi={regi}/>
          </Grid.Column>
        </Grid>
        <Divider vertical>And</Divider>
      </Segment>
      <Button floated='right'>Save</Button>
    </div>
  );
};

export default DividerVertical;
