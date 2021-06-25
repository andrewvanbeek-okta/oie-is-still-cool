/* eslint-disable */
import React, { useEffect, useRef, Component } from 'react';
import { withOktaAuth } from '@okta/okta-react';
import * as OktaSignIn from '@okta/okta-signin-widget';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';
import gql from 'graphql-tag'
import { Accordion, Button, Icon, Form } from 'semantic-ui-react';
import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync'

import config from '../../config';


export default  withOktaAuth(class DynamicWidget extends Component {
  constructor(props) {
    super(props);
    console.log('myprops:' + this.props);
    this.wrapper = React.createRef();
    this.thumbnail = null
    this.customTitle =
      this.props.customTitle || 'Sign In widget ready to Customize';
    const { issuer, clientId, redirectUri, scopes } = config.oidc;
    this.config = {
      baseUrl: issuer.split('/oauth2')[0],
      title: this.customTitle,
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
      registration: {},
    };
  }

  mutate = gql(`
  mutation createWidget($createwidgetinput: CreateWidgetInput!) {
    createWidget(input: $createwidgetinput) {
      name
      id
      title
      owner
      client_id
      base_url
      js_config
      css_config
      issuer
      img
      name
      description
      link
      logo_url
      meta
    }
  }
`)

  componentWillReceiveProps(nextProps) {
    console.log(this.wrapper.current.children)
    var signInWidget = this.wrapper.current.children[0].style = "display: none"
    this.wrapper.current.style = ""
    // You don't have to do this check first, but it can help prevent an unneeded render
    console.log(nextProps);
    this.widget.remove();
    const { issuer, clientId, redirectUri, scopes } = config.oidc;
    var title = nextProps.title || this.customTitle;
    var logoUrl = nextProps.logo || this.config.logo;
    var socialproviders = nextProps.socialAuthProviders || [];
    let socials = socialproviders.map((idpName) => {
      switch (idpName) {
        case 'Google':
          return {
            type: 'GOOGLE',
            id: '0oas1xf5skldmfdisof',
          };
        case 'Apple':
          return {
            type: 'APPLE',
            id: 'oas1xdsfijdsofjiosj',
          };
        case 'Facebook':
          return {
            type: 'FACEBOOK',
            id: '0oas1xf5disojfiodshfoisd',
          };
        case 'LinkedIn':
          return {
            type: 'LINKEDIN',
            id: '0oas1xf5disojfifsshfoisd',
          };
        default:
          return '';
      }
    });
  
    this.config = {
      baseUrl: issuer.split('/oauth2')[0],
      clientId,
      redirectUri,
      logo: logoUrl,
      features: {
        registration: true, // Enable self-service registration flow
      },
      idps: socials,
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
      registration: {},
    }

    this.widget = new OktaSignIn(this.config);
    this.widget
      .showSignInToGetTokens({
        el: this.wrapper.current,
        scopes,
      })
      .then((tokens) => {
        // Add tokens to storage
        oktaAuth.handleLoginRedirect(tokens);
      })
      .catch((err) => {
        throw err;
      });
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

  vari = {
    "name": "jk",
  }

 

  // title: String
	// owner: String
	// client_id: String
	// base_url: String
	// js_config: String
	// css_config: String
	// issuer: String
	// img: String
	// name: String
	// description: String
	// link: String
	// logo_url: String
  submitWidget = async(thumbmail) => {
    var token = JSON.parse(localStorage.getItem("okta-token-storage"))
    var user = await this.props.oktaAuth.getUser()
    console.log(token.accessToken.value)
    this.vari.name = this.config.title
    this.vari.title = this.config.title
    this.vari.logo_url = this.config.logo
    console.log("Why are you not a thumb:", this.config.thumbnail)
    this.vari.img = thumbmail
    this.vari.owner = user.sub
    
    var graphqlClient = new AWSAppSyncClient({
      url: "https://my3tbw2e4ngbjaq3dxnbra3fhe.appsync-api.us-west-2.amazonaws.com/graphql",
      region: "us-west-2",
      disableOffline: true,
      auth: {
        type: AUTH_TYPE.OPENID_CONNECT,
        jwtToken: token.accessToken.value,
      },
    });
    try {
      var response = await graphqlClient.mutate({ mutation: this.mutate, variables:{createwidgetinput: this.vari} })
    console.log(response.data)
    } catch(e) {
      console.log(e)
    }
  }


  checkUploadResultThumbnail = (resultEvent, config) => {
    console.log(this)
    console.log(resultEvent)
    if (resultEvent.event == "success") {
      console.log(resultEvent.info.url)
      this.thumbnail = resultEvent.info.url
      this.submitWidget(this.thumbnail)
    }
  }

  showWidgetThumbnail = (field) => {
    var config = this.config
    var widget = cloudinary.createUploadWidget({
      cloudName: 'styling-signin', uploadPreset: 'rj2rjbps', folder: 'widgetUpload', cropping: true
    },
      (error, result) => { this.checkUploadResultThumbnail(result, config) })
    widget.open()
  }

  componentDidMount() {
    const { issuer, clientId, redirectUri, scopes } = config.oidc;
    var title = this.customTitle;
    this.widget = new OktaSignIn(this.config);
    this.widget
      .showSignInToGetTokens({
        el: this.wrapper.current,
        scopes,
      })
      .then((tokens) => {
        // Add tokens to storage
        oktaAuth.handleLoginRedirect(tokens);
      })
      .catch((err) => {
        throw err;
      });

    return () => widget.remove();
  }

  componentWillUnmount() {
    this.widget.remove();
  }

  render() {
    return <div><Form>
    <Form.Field>
      <label>First Name</label>
      <input placeholder='First Name' />
    </Form.Field>
    <Form.Field>
      <label>Last Name</label>
      <input placeholder='Last Name' />
    </Form.Field>
    <Button type='submit'>Submit</Button>
  </Form><Button onClick={this.submitWidget}floated='right'>Right Floated</Button><Button onClick={this.showWidgetThumbnail}floated='right'>Take a Picture</Button><div ref={this.wrapper} /></div>;
  }
})
