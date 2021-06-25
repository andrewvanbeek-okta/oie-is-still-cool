/* eslint-disable */
import React, { Component } from 'react';
import { render } from "react-dom";
import AceEditor from "react-ace";
import { Accordion, Button, Icon } from 'semantic-ui-react';
import Step1 from './Step1';
import Step3 from './Step3';
import Step5 from './Step5';
import { SketchPicker } from 'react-color';

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";

class AccordionSteps extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0, customStyle: "blue",  background: '#fff'};
    this.handleSubmit = this.props.handleSubmit;
  }

  handleChangeComplete = (color) => {
    this.setState({ background: color.hex });
  };

  handleClick = (index) => (event) => {
    console.log(event);
    // const { index } = this.props;
    const { activeIndex } = this.state;
    const { customStyle } = this.state;
    const newIndex = activeIndex === index ? -1 : index;
    this.setState({ activeIndex: newIndex });
  };

  render() {
    const { activeIndex } = this.state;
    const { customStyle } = this.state;

    return (
      <div>
      <Accordion>
        <Accordion.Title
          active={activeIndex === 0}
          onClick={this.handleClick(0)}
        >
          <Icon name="dropdown" />
          Enter a title
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 0}>
          <Step1 handleSubmit={this.handleSubmit}/>
        </Accordion.Content>

        <Accordion.Title
          active={activeIndex === 1}
          onClick={this.handleClick(1)}
        >
          <Icon name="dropdown" />
          Upload your company logo
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 1}>
        <form action="/action_page.php">
          <input type="file" id="myFile" name="filename" />
          <input type="submit" />
        </form>
        </Accordion.Content>

        <Accordion.Title
          active={activeIndex === 2}
          onClick={this.handleClick(2)}
        >
          <Icon name="dropdown" />
          Add Social Authenticators
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 2}>
          <Step3 />
        </Accordion.Content>

        <Accordion.Title
          active={activeIndex === 3}
          onClick={this.handleClick(3)}
        >
          <Icon name="dropdown" />
          Choose a background color
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 3}>
          <SketchPicker 
            color={ this.state.background }
            onChangeComplete={ this.handleChangeComplete }
          />
        </Accordion.Content>

        <Accordion.Title
          active={activeIndex === 4}
          onClick={this.handleClick(4)}
        >
          <Icon name="dropdown" />
          Enable registration
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 4}>
          <Step5 />
        </Accordion.Content>
      </Accordion>
      <h1>Custom CSS</h1>
      <Button> Apply</Button>
      <br />
      <AceEditor
        ref="ace"
        id="ace"
        style={ { color: `${ this.state.customStyle }` } }
        className="editor"
        mode="java"
        theme="github"
        name="UNIQUE_ID_OF_DIV"
        editorProps={{ $blockScrolling: true }}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true
        }}
      />,
      </div>
    );
  }
}

export default AccordionSteps;
