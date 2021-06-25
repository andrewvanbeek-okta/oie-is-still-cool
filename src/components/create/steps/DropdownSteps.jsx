/* eslint-disable */
import React, { Component } from 'react';
import { render } from "react-dom";
import AceEditor from "react-ace";
import { Accordion, Button, Icon } from 'semantic-ui-react';
import Step1 from './Step1CustomTitle';
import Step3 from './Step3CustomAuth';
import Step5 from './Step5EnableRegistration';
import { SketchPicker } from 'react-color';
import $ from 'jquery';
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import gql from 'graphql-tag'
import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync'
import awsconfig from '../../../aws-exports';



class DropdownSteps extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
    this.handleSubmit = this.props.handleChangeToCustomTitle;
    this.logoChange = this.props.handleLogoUrl;
    this.handleSocialAuth = this.props.handleSocialAuth;
    this.handleReg = this.props.handleReg;
    // this.handleCustomColor = this.props.handleCustomColor;
    this.value = `
    #okta-sign-in.auth-container  {
        "border-bottom-color": "#ddd";
        "background": "red";
    }`.trim()
    console.log(this.props.handleChangeToCustomTitle)
    this.handleCustomColorChange = this.handleCustomColorChange.bind(this)
  }


  mutate = gql(`
  mutation createWidget($createwidgetinput: CreateWidgetInput!) {
    createWidget(input: $createwidgetinput) {
      name
    }
  }
`)

vari = {
  "name": "jk",
}

  onChange(newValue) {
    console.log("change", newValue);
    // var items = newValue.split(" {")
  
    // var selector = items[0]
    // items.shift()
    // console.log("#######")
    // console.log(selector)
    // console.log(items.join("").trim())
    // var css = "{ " + items.join("").trim()
    // console.log(css)
    // var fullPicture = JSON.parse(css)
    // console.log(fullPicture)
    // console.log("#######")
    // $(selector).css(fullPicture)
  }
  
  submitWidget = async (name) => {
    var token = JSON.parse(localStorage.getItem("okta-token-storage"))
    console.log(token.accessToken.value)
    var graphqlClient = new AWSAppSyncClient({
      url: "https://my3tbw2e4ngbjaq3dxnbra3fhe.appsync-api.us-west-2.amazonaws.com/graphql",
      region: "us-west-2",
      disableOffline: true,
      auth: {
        type: AUTH_TYPE.OPENID_CONNECT,
        jwtToken: token.accessToken.value,
      },
    });
    try {
      var response = await graphqlClient.mutate({ mutation: this.mutate, variables:{createwidgetinput: this.vari} })
    console.log(response.data)
    } catch(e) {
      console.log(e)
    }
 
    
  }

  handleCustomColorChange(newValue) {
    console.log("change", newValue, this.props);
    this.props.handleCustomColor(newValue.hex);
    this.setState({customColor: newValue});
  }

  // This is for the active dropdown option
  handleClick = (index) => (event) => {
    console.log("scooby doo")
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;
    this.setState({ activeIndex: newIndex });
  };

  avbTest = () => {
    console.log("cool beans")
  }


  checkUploadResult = (resultEvent, field) => {
    console.log(resultEvent)
    console.log(field)
    if (resultEvent.event == "success") {
      console.log(resultEvent.info.url)
      this.logoChange(resultEvent.info.url)
    }
  }

  applyCode = () => {
    var code = this.refs.aceEditor.editor.getValue()
  }



  showWidget = (field) => {
    var widget = cloudinary.createUploadWidget({
      cloudName: 'styling-signin', uploadPreset: 'rj2rjbps', folder: 'widgetUpload', cropping: true
    },
      (error, result) => { this.checkUploadResult(result, field) })
    widget.open()
  }

  render() {
    const { activeIndex } = this.state;

    return (
      <div>
        <Accordion>
          {/* *********************TITLE******************** */}
          <Accordion.Title
            active={activeIndex === 0}
            onClick={this.handleClick(0)}
          >
            <Icon name="dropdown" />
          Enter a title
        </Accordion.Title>
          <Accordion.Content active={activeIndex === 0}>
            <Step1 handleSubmit={this.handleSubmit} />
          </Accordion.Content>
          {/* *********************TITLE******************** */}

          {/* *********************LOGO******************** */}
          <Accordion.Title
            active={activeIndex === 1}
            onClick={this.handleClick(1)}
          >
            <Icon name="dropdown" />
          Upload your company logo
        </Accordion.Title>
          <Accordion.Content active={activeIndex === 1}>
            <Button primary onClick={() => this.showWidget("field")}>Primary</Button>
          </Accordion.Content>
          {/* *********************LOGO******************** */}

          {/* *********************SOCIAL******************** */}
          <Accordion.Title
            active={activeIndex === 2}
            onClick={this.handleClick(2)}
          >
            <Icon name="dropdown" />
          Add Social Authenticators
        </Accordion.Title>
          <Accordion.Content active={activeIndex === 2}>
            <Step3 handleSocialAuth={this.handleSocialAuth}/>
          </Accordion.Content>
          {/* *********************SOCIAL******************** */}

          {/* *********************COLOR-PICKER******************** */}
          <Accordion.Title
            active={activeIndex === 3}
            onClick={this.handleClick(3)}
          >
            <Icon name="dropdown" />
          Choose a background color
        </Accordion.Title>
          <Accordion.Content active={activeIndex === 3}>
            <div className="colorPicker">
              <SketchPicker
                color={this.state.customColor}
                onChangeComplete={this.handleCustomColorChange}
              />
            </div>
          </Accordion.Content>
          {/* *********************COLOR-PICKER******************** */}

          {/* *********************REG******************** */}
          <Accordion.Title
            active={activeIndex === 4}
            onClick={this.handleClick(4)}
          >
            <Icon name="dropdown" />
          Enable registration
        </Accordion.Title>
          <Accordion.Content active={activeIndex === 4}>
            <Step5 handleReg={this.handleReg}/>
          </Accordion.Content>
          {/* *********************REG******************** */}
        </Accordion>
     
        <h1>Custom CSS</h1>
        <Button> Apply</Button>
        <br />
        <AceEditor ref="aceEditor"
    mode="java"
    theme="github"
    onChange={this.onChange}
    name="UNIQUE_ID_OF_DIV"
    value={this.value}
    editorProps={{ $blockScrolling: true }}
    setOptions={{
      enableBasicAutocompletion: true,
      enableLiveAutocompletion: true,
      enableSnippets: true
    }}
  />,
   <Button onClick={this.submitWidget} floated='right'>Right Floated</Button>
      </div>
    );
  }
}

export default DropdownSteps;
