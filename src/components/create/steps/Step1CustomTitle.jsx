import React from 'react';
import { Input } from 'semantic-ui-react';

const Step1CustomTitle = ({ handleSubmit }) => (
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

export default Step1CustomTitle;
