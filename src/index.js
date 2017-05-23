import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './components/App';
import Booking from './components/pages/Booking';
import Details from './components/pages/Details';
import Availability from './components/pages/Availability';
import AuthService from './utils/AuthService';
import Home from './components/pages/Home';

import './index.css';

const auth = new AuthService('mDjKJ-cjHls9d694dX7VpOqFgM8573KE', 'dialogue-app.auth0.com');

// validate authentication for private routes
const requireAuth = (nextState, replace, cb) => {
  if (auth.loggedIn()) {
    cb();
    return;
  }

  setTimeout(() => {
    if (!auth.loggedIn()) {
      localStorage.redirectUrl = window.location.pathname + window.location.search;
      auth.login();
    }else{
      cb();
    }
  }, 500);

};

const redirectAfterLogin = (nextState, replace) => {
  if (localStorage.redirectUrl) {
    const url = localStorage.redirectUrl;
    delete localStorage.redirectUrl;
    replace(url);
  }
  else {
    replace('/home');
  }
};

const routes = (
<Router history={browserHistory}>
  <Route path="/bookings" component={App} auth={auth} onEnter={requireAuth}>
    <IndexRoute component={Booking} auth={auth}/>
    <Route path="/bookings/:date" auth={auth} component={Availability}/>
    <Route path="/booking/:id" auth={auth} component={Details}/>
    <Route path="/home" auth={auth} component={Home}/>
    <Route path="/callback" onEnter={redirectAfterLogin}/>
  </Route>
</Router>
);

ReactDOM.render(routes, document.getElementById('root'));
