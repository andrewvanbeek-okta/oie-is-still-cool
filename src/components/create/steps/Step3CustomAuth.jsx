/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Radio } from 'semantic-ui-react';

const Step3CustomAuth = ({ handleSocialAuth }) => {
  const [socials, setSocials] = useState([]);

  var handleChange = (async (e, data) => {
    // console.log(e)
    var currentSocails = socials || []
    data.checked ? currentSocails.push(e.target.textContent) : currentSocails.splice(currentSocails.indexOf(e.target.textContent),1)
    // currentSocails[e.target.textContent] = data.checked
    setSocials(currentSocails)
    console.log("my socials", socials)
    handleSocialAuth(socials)
  })

  
  return (
  <div>
    <Radio toggle label="Google" onClick={(evt, data)=> handleChange(evt, data)}/>
    <br />
    <Radio toggle label="Facebook" onClick={(evt, data)=> handleChange(evt, data)}/>
    <br />
    <Radio toggle label="LinkedIn" onClick={(evt, data)=> handleChange(evt, data)}/>
    <br />
    <Radio toggle label="Apple" onClick={(evt, data)=> handleChange(evt, data)}/>
  </div>
);
}

export default Step3CustomAuth;
