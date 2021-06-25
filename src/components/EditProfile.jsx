import React, { useState, useEffect } from 'react';
import { useOktaAuth } from '@okta/okta-react';
// import './EditProfile.css';
import Form from '@rjsf/semantic-ui';
import { useHistory } from 'react-router-dom';

const EditProfile = () => {
//   const [name, setName] = useState(''); //

  const { authState, oktaAuth } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);
  //   const [profilePic, setProfilePic] = useState(null);
  const history = useHistory();

  useEffect(() => {
    if (!authState.isAuthenticated) {
      // When user isn't authenticated, forget any user info
      setUserInfo(null);
    } else {
      oktaAuth.getUser().then((info) => {
        setUserInfo(info);
        console.log(info);
        const requestOptions = {
          method: 'get',

          headers: {
            'Content-Type': 'application/json',
            Authorization: 'SSWS 00lEZxk9ylAKojqLlKr3ALDXKAhKVoR27OacXudJlf',
            scopeId: 'okta.users.manage',
          },
        //   referrerPolicy: 'strict-origin-when-cross-origin',
        };
        console.log(JSON.stringify(requestOptions));
        fetch(
          // PUT IN HERE
          // api 00IH5m4XCkK-IpOz5OwdB613XaYoMMYxiTLM5TcG3c
          `https://oie-is-cool.oktapreview.com/api/v1/users/${info.sub}`,
          requestOptions,
        ).then((response) => response.json().then((res) => {
        //   setProfilePic(res.profile.profilePic)
          console.log(res);
        }));
      });
    }
  }, [authState, oktaAuth]); // Update if authState changes

  if (!userInfo) {
    return (
      <div>
        <p>Fetching user profile...</p>
      </div>
    );
  }

  // edit this to match your user schema

  const schema = {
    title: 'Edit Profile',
    type: 'object',
    properties: {
      firstName: {
        type: 'string',
        title: 'First name',
        default: userInfo.given_name,
      },
      lastName: {
        type: 'string',
        title: 'Last name',
        default: userInfo.family_name,
      },
      email: {
        type: 'string',
        title: 'Email',
        default: userInfo.email,
      },
      //   phone_number: {
      //     type: 'string',
      //     title: 'Phone',
      //     default: userInfo.mobilePhone,

    //   },
    //   profilePic: {
    //     type: 'string',
    //     title: 'Profile Pic',
    //     default: profilePic,
    //   },
    },
  };

  function handleSubmit(input) {
    // push changes to user via API call
    // can create an event hook in Okta to push changes to your DB using the Okta when users are updated

    const requestOptions = {
      method: 'post',

      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${oktaAuth.getAccessToken()}`,
        Authorization: 'SSWS 00lEZxk9ylAKojqLlKr3ALDXKAhKVoR27OacXudJlf',

        scopeId: 'okta.users.manage',
      },
      //  referrerPolicy: 'strict-origin-when-cross-origin',

      body: JSON.stringify({ profile: input }),
    };
    console.log(JSON.stringify(requestOptions));
    fetch(
      `https://oie-is-cool.oktapreview.com/api/v1/users/${userInfo.sub}`,
      requestOptions,
    )
      .then((response) => response.json())
      // eslint-disable-next-line no-shadow
      .then((input) => {
        // eslint-disable-next-line no-restricted-globals
        // location.href('http://localhost:8080/profile');
        console.log(JSON.stringify({ profile: input }));
      });
    history.replace("/profile");
  }

  return (
    <div>

      <br />
      <br />
      <br />
      <br />
      <br />

      <div style={{ display: 'flex', justifyContent: 'center' }} className="ui link cards">
        <div className="card">
          {/* <a href="./editprofile" className="ui positive button">Save Changes</a> */}
          <div className="content">
            <Form schema={schema} onSubmit={(data) => handleSubmit(data.formData)} />
          </div>
        </div>
      </div>

    </div>

  );
};

export default EditProfile;
