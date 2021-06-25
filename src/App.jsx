import React from 'react';
import { Route, useHistory, Switch } from 'react-router-dom';
import { OktaAuth } from '@okta/okta-auth-js';
import { Security, SecureRoute, LoginCallback } from '@okta/okta-react';
import config from './config';
import CustomLoginComponent from './components/Login';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import Landing from './components/LoginContainer';
import AnimatedBackground from './components/AnimatedBackground';
import './index.css';
import DividerVertical from './components/create/layout/DividerVertical';
import Details from './components/Details';
import EditProfile from './components/EditProfile';

const oktaAuth = new OktaAuth(config.oidc);

const App = () => {
  const history = useHistory(); // example from react-router

  const customAuthHandler = () => {
    // Redirect to the /login page that has a CustomLoginComponent
    history.push('/login');
  };

  return (
    <Security
      oktaAuth={oktaAuth}
      onAuthRequired={customAuthHandler}
    >
      <Navbar />
      <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/login/callback" component={LoginCallback} />
        <Route path="/login" component={CustomLoginComponent} />
        <SecureRoute path="/upload" component={DividerVertical} />
        <SecureRoute path="/profile" component={Profile} />
        <SecureRoute path="/editprofile" component={EditProfile} />
        <SecureRoute exact path="/dashboard" component={Dashboard} />
        <Route path="/:id/details" component={Details} />
      </Switch>
      <AnimatedBackground />
      <div className="overlay">
        <Landing />
      </div>
    </Security>
  );
};

export default App;
