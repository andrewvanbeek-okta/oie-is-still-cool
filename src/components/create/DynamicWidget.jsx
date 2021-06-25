/* eslint-disable */
import React, { useEffect, useRef, Component } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import * as OktaSignIn from '@okta/okta-signin-widget';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';

import config from '../../config';

export default class DynamicWidget extends Component {
  constructor(props) {
    super(props);
    console.log(this.props)
    this.wrapper = React.createRef();
    this.customTitle = this.props.customTitle || "Sign In widget ready to Customize"
    console.log(this.regi)
    const { issuer, clientId, redirectUri, scopes } = config.oidc;
    this.config = {
      baseUrl: issuer.split('/oauth2')[0],
      clientId,
      redirectUri,
      logo: '/react.svg',
      features: {
        registration: this.regi,
      },
      idps: [],
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
    }
  }

  componentWillReceiveProps(nextProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    console.log(nextProps)
    this.widget.remove()
    const { issuer, clientId, redirectUri, scopes } = config.oidc;
    var title = nextProps.title || this.customTitle
    var logoUrl = nextProps.logo || this.config.logo
    var socialproviders = []
    // var isRegistration = this.state.regi;
    console.log("this is the set title:", title)

    if(nextProps.socialAuthProviders) {
      if(nextProps.socialAuthProviders["Google"]) {
        socialproviders.push({ type: 'GOOGLE', id: '0oas1xf5skldmfdisof' })
      } if(nextProps.socialAuthProviders["Apple"]) {
        socialproviders.push({ type: 'APPLE', id: '0oas1xdsfijdsofjiosj' })
      } if(nextProps.socialAuthProviders["Facebook"]) {
        socialproviders.push({ type: 'FACEBOOK', id: '0oas1xf5disojfiodshfoisd' })
      } if(nextProps.socialAuthProviders["Linkedin"]) {
        socialproviders.push({ type: 'LINKEDIN', id: '0oas1xf5disojfifsshfoisd' })
      }
    }
    console.log("this is our socials:", socialproviders)


    this.widget = new OktaSignIn({
            baseUrl: issuer.split('/oauth2')[0],
            clientId,
            redirectUri,
            logo: logoUrl,
            features: {
              registration: !this.props.regi, // Enable self-service registration flow
            },
            idps: socialproviders,
            i18n: {
              en: {
                'primaryauth.title': title,
              },
            },
            colors: {
              brand: this.props.customColor
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

    return (
    <div>
      <div ref={this.wrapper} />
      {/* <div {isRegistration} /> */}
    </div>
    )
  }
}
