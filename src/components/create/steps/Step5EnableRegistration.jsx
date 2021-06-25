/* eslint-disable */
import React, { useState } from 'react';
import { Radio } from 'semantic-ui-react';

const Step5EnableRegistration = ({ handleReg }) => {
  const [regi, setRegi] = useState();

  const handleChange = (async (e, data) => {
    console.log(e);
    var currentReg = regi ;
    currentReg = data.checked;
    setRegi(currentReg);
    console.log(currentReg);
    handleReg(regi);
  })

  return (
  <div>
    <Radio toggle label="Registration" onClick={(evt, data)=> handleChange(evt, data)}/>
  </div>
  );
};

export default Step5EnableRegistration;
