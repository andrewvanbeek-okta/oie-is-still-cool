import React from 'react';
import { Route, useHistory, Switch } from 'react-router-dom';
import { OktaAuth } from '@okta/okta-auth-js';
import { Security, SecureRoute, LoginCallback } from '@okta/okta-react';
import config from './config';
import Home from './components/Home';
import CustomLoginComponent from './components/Login';
import Messages from './components/Messages';
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import Landing from './components/LoginContainer';
import AnimatedBackground from './components/AnimatedBackground';
import './index.css';
import Dashboard from './components/Dashboard';
import DashboardCopy from './components/DashboardCopy';

const oktaAuth = new OktaAuth(config.oidc);

const App = () => {
  const history = useHistory(); // example from react-router

  const customAuthHandler = () => {
    // Redirect to the /login page that has a CustomLoginComponent
    history.push('/login');
  };

  return (
    <Security oktaAuth={oktaAuth} onAuthRequired={customAuthHandler}>
      <Navbar />
      {/* This is where i took out the container component */}
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login/callback" component={LoginCallback} />
        <Route path="/login" component={CustomLoginComponent} />
        <SecureRoute path="/messages" component={Messages} />
        <SecureRoute path="/profile" component={Profile} />
        <SecureRoute path="/dashboard" component={Dashboard} />
        <SecureRoute path="/copy" component={DashboardCopy} />
      </Switch>
      <AnimatedBackground />
      <div className="overlay">
        <Landing />
      </div>
    </Security>
  );
};

export default App;
