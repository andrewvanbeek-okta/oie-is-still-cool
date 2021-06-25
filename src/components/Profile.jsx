/* eslint-disable object-curly-spacing */
/* eslint-disable no-undef */
/* eslint-disable react/style-prop-object */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable jsx-a11y/anchor-is-valid */
/*
 * Copyright (c) 2018, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import React, { useState, useEffect } from 'react';
import { useOktaAuth } from '@okta/okta-react';
// import { Header, Icon, Table } from 'semantic-ui-react';

const Profile = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (!authState.isAuthenticated) {
      // When user isn't authenticated, forget any user info
      setUserInfo(null);
    } else {
      oktaAuth.getUser().then((info) => {
        setUserInfo(info);
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

  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <br />

      <div style={{display: 'flex', justifyContent: 'center'}} className="ui link cards">
        <div className="card">
          <a href="./editprofile" className="ui primary button">Edit Profile</a>
          <div className="image">
            <img src="https://smhlancers.org/wp-content/uploads/2016/06/profile-placeholder-300x300.png" alt="profile pic" />
          </div>
          <div className="content">
            <div className="header">{userInfo.name}</div>

            <div className="description">
              Email: &nbsp;
              {userInfo.email}
              
            </div>
          </div>
          <div className="extra content">
            <span className="right floated">
              Last updated on &nbsp;
              {new Date(userInfo.updated_at).toDateString()}
            </span>

          </div>
        </div>
      </div>
    </div>
  /* { <div>
        <Header as="h1">
          <Icon name="drivers license" />
          {' '}
          My User Profile (ID Token Claims)
          {' '}
        </Header>
        <Table>
          <thead>
            <tr>
              <th>Claim</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(userInfo).map((claimEntry) => {
              const claimName = claimEntry[0];
              const claimValue = claimEntry[1];
              const claimId = `claim-${claimName}`;
              return (
                <tr key={claimName}>
                  <td>{claimName}</td>
                  <td id={claimId}>{claimValue.toString()}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div> }
    </div> */
  );
};

export default Profile;
