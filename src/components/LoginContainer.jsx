import { useOktaAuth } from '@okta/okta-react';
import React from 'react';
import CustomLoginComponent from './Login';

const Landing = () => {
  const { authState } = useOktaAuth();

  return (
    <div>
      <div>
        {!authState.isAuthenticated
        && (
        <div>
          <CustomLoginComponent />
        </div>
        )}
      </div>
    </div>
  );
};
export default Landing;
