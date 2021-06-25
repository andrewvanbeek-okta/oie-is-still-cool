import React from 'react';
import { Input } from 'semantic-ui-react';

const InputExampleFocus = ({ handleSubmit }) => (
  <div>
    <Input
      type="text"
      name="firstName"
      onChange={(e) => { handleSubmit(e); }}
      focus
      placeholder="Company..."
    />
  </div>
);

export default InputExampleFocus;
