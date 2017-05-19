import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './components/App';
import Booking from './components/pages/Booking';
import Details from './components/pages/Details';
import Availability from './components/pages/Availability';
import AuthService from './utils/AuthService';

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
      auth.login();
    }else{
      cb();
    }
  }, 500);

}

const routes = (
<Router history={browserHistory}>
  <Route path="/bookings" component={App} auth={auth} onEnter={requireAuth}>
    <IndexRoute component={Booking} auth={auth}/>
    <Route path="/bookings/:date" auth={auth} component={Availability}/>
    <Route path="/booking/:id" auth={auth} component={Details}/>

  </Route>
</Router>
);

ReactDOM.render(routes, document.getElementById('root'));
