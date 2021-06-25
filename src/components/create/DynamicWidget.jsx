/* eslint-disable */
import React, { useEffect, useRef, Component } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import * as OktaSignIn from '@okta/okta-signin-widget';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';


import config from '../../config';

// const DynamicWidget = ({ customTitle }) => {
//   const { oktaAuth } = useOktaAuth();
//   const widgetRef = useRef();
//   console.log(customTitle)
//   console.log("YOOO")
//   console.log(this)
  
//   function Welcome(props) {
//     console.log("this called")
//     console.log(props)
//   }

//   useEffect(() => {
//     if (!widgetRef.current) {
//       return false;
//     }
//     console.log(customTitle)
//     Welcome()
//     const { issuer, clientId, redirectUri, scopes } = config.oidc;
//     const widget = new OktaSignIn({
//       /**
//        * Note: when using the Sign-In Widget for an OIDC flow, it still
//        * needs to be configured with the base URL for your Okta Org. Here
//        * we derive it from the given issuer for convenience.
//        */
//       baseUrl: issuer.split('/oauth2')[0],
//       clientId,
//       redirectUri,
//       logo: '/react.svg',
//       features: {
//         registration: true, // Enable self-service registration flow
//       },
//       idps: [
//         { type: 'GOOGLE', id: '0oas1xf52O9XhIAYb5d6' },
//         // { type: 'OKTA', id: '0oas1xf52O9XhIAYb5d6', text: 'Sign in with Okta', logo: '/react.svg' },
//         // { type: 'FACEBOOK', id: '0oas1xf52O9XhIAYb5d6' },
//         // { type: 'APPLE', id: '0oas1xf52O9XhIAYb5d6' },
//         // { type: 'LINKEDIN', id: '0oas1xf52O9XhIAYb5d6' },
//         // { type: 'MICROSOFT', id: '0oas1xf52O9XhIAYb5d6' },
//       ],
//       i18n: {
//         en: {
//           'primaryauth.title': Object.values({ customTitle }),
//         },
//       },
//       authParams: {
//         // To avoid redirect do not set "pkce" or "display" here. OKTA-335945
//         issuer,
//         scopes,
//       },
//       registration: {
//       },
//       /* registration: {
//         parseSchema: function(schema, onSuccess, onFailure) {
//           // handle parseSchema callback
//           onSuccess(schema);
//       },
//          preSubmit: function (postData, onSuccess, onFailure) {
//            // handle preSubmit callback
//            onSuccess(postData);
//       },
//          postSubmit: function (response, onSuccess, onFailure) {
//           // handle postsubmit callback
//           onSuccess(response);
//       }
//     },
//     features: {
//       // Used to enable registration feature on the widget.
//       // https://github.com/okta/okta-signin-widget#feature-flags
//        registration: true // REQUIRED
//     }, */
//     });

//     widget.showSignInToGetTokens({
//       el: widgetRef.current,
//       scopes,
//     }).then((tokens) => {
//       // Add tokens to storage
//       oktaAuth.handleLoginRedirect(tokens);
//     }).catch((err) => {
//       throw err;
//     });

//     return () => widget.remove();
//   }, [oktaAuth, customTitle]);

//   return (
//     <div>
//       <div className="dynamicWidgetContainer" ref={widgetRef} />
//     </div>
//   );
// };
// export default DynamicWidget;




export default class DynamicWidget extends Component {
  constructor(props) {
    super(props);
    console.log(this.props)
    this.wrapper = React.createRef();
    this.customTitle = this.props.customTitle || "Sign In widget ready to Customize"
    const { issuer, clientId, redirectUri, scopes } = config.oidc;
    this.config = {
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
          'primaryauth.title': this.customTitle,
        },
      },
      authParams: {
        // To avoid redirect do not set "pkce" or "display" here. OKTA-335945
        issuer,
        scopes,
      },
      registration: {
      },
    }
  }

  componentWillReceiveProps(nextProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    console.log(nextProps)
    this.widget.remove()
    const { issuer, clientId, redirectUri, scopes } = config.oidc;
    var title = nextProps.title || this.customTitle
    var logoUrl = nextProps.logo || this.config.logo
    this.widget = new OktaSignIn({
            baseUrl: issuer.split('/oauth2')[0],
            clientId,
            redirectUri,
            logo: logoUrl,
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
                'primaryauth.title': title,
              },
            },
            authParams: {
              // To avoid redirect do not set "pkce" or "display" here. OKTA-335945
              issuer,
              scopes,
            },
            registration: {
            },
          });
        this.widget.showSignInToGetTokens({
      el: this.wrapper.current,
      scopes,
    }).then((tokens) => {
      // Add tokens to storage
      oktaAuth.handleLoginRedirect(tokens);
    }).catch((err) => {
      throw err;
    });

    return () => widget.remove();
  }

  componentDidMount() {
    const { issuer, clientId, redirectUri, scopes } = config.oidc;
    var title = this.customTitle
    this.widget = new OktaSignIn(this.config);
        this.widget.showSignInToGetTokens({
      el: this.wrapper.current,
      scopes,
    }).then((tokens) => {
      // Add tokens to storage
      oktaAuth.handleLoginRedirect(tokens);
    }).catch((err) => {
      throw err;
    });

    return () => widget.remove();
  }

  componentWillUnmount() {
    this.widget.remove();
  }

  render() {
    return <div ref={this.wrapper} />;
  }
}
