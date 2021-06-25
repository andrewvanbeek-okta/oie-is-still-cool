/* eslint-disable */
import React from 'react';
import { Input } from 'semantic-ui-react';

const Step1CustomTitle = ({ handleSubmit }) => (
  <div>
    <Input
      type="text"
      name="firstName"
      onKeyUp={(e) => { 
        setTimeout(function(){ handleSubmit(e.target.value) }, 2000)
      console.log(e.target.value)
      }}
      focus
      placeholder="Company..."
    />
  </div>
);

export default Step1CustomTitle;
