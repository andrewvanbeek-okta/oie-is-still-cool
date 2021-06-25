import React, { useEffect, useRef } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import * as OktaSignIn from '@okta/okta-signin-widget';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';

import config from '../../config';

const DynamicWidget = ({ customTitle }) => {
  const { oktaAuth } = useOktaAuth();
  const widgetRef = useRef();

  useEffect(() => {
    if (!widgetRef.current) {
      return false;
    }

    const { issuer, clientId, redirectUri, scopes } = config.oidc;
    const widget = new OktaSignIn({
      /**
       * Note: when using the Sign-In Widget for an OIDC flow, it still
       * needs to be configured with the base URL for your Okta Org. Here
       * we derive it from the given issuer for convenience.
       */
      baseUrl: issuer.split('/oauth2')[0],
      clientId,
      redirectUri,
      logo: '/react.svg',
      features: {
        registration: true, // Enable self-service registration flow
      },
      idps: [
        { type: 'GOOGLE', id: '0oas1xf52O9XhIAYb5d6' },
        // { type: 'OKTA', id: '0oas1xf52O9XhIAYb5d6', text: 'Sign in with Okta', logo: '/react.svg' },
        // { type: 'FACEBOOK', id: '0oas1xf52O9XhIAYb5d6' },
        // { type: 'APPLE', id: '0oas1xf52O9XhIAYb5d6' },
        // { type: 'LINKEDIN', id: '0oas1xf52O9XhIAYb5d6' },
        // { type: 'MICROSOFT', id: '0oas1xf52O9XhIAYb5d6' },
      ],
      i18n: {
        en: {
          'primaryauth.title': Object.values({ customTitle }),
        },
      },
      authParams: {
        // To avoid redirect do not set "pkce" or "display" here. OKTA-335945
        issuer,
        scopes,
      },
      registration: {
      },
      /* registration: {
        parseSchema: function(schema, onSuccess, onFailure) {
          // handle parseSchema callback
          onSuccess(schema);
      },
         preSubmit: function (postData, onSuccess, onFailure) {
           // handle preSubmit callback
           onSuccess(postData);
      },
         postSubmit: function (response, onSuccess, onFailure) {
          // handle postsubmit callback
          onSuccess(response);
      }
    },
    features: {
      // Used to enable registration feature on the widget.
      // https://github.com/okta/okta-signin-widget#feature-flags
       registration: true // REQUIRED
    }, */
    });

    widget.showSignInToGetTokens({
      el: widgetRef.current,
      scopes,
    }).then((tokens) => {
      // Add tokens to storage
      oktaAuth.handleLoginRedirect(tokens);
    }).catch((err) => {
      throw err;
    });

    return () => widget.remove();
  }, [oktaAuth]);

  return (
    <div>
      <div className="dynamicWidgetContainer" ref={widgetRef} />
    </div>
  );
};
export default DynamicWidget;
