import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import App from './components/App';
import Booking from './components/pages/Booking';
import Confirmation from './components/pages/Confirmation';
import Availability from './components/modals/Availability'
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
  <Route path="/" component={App} auth={auth} onEnter={requireAuth}>
    <Route path="/booking" component={Booking}/>
    <Route path="/booking/:date" component={Availability}/>
    <Route path="/confirmation" component={Confirmation}/>
  </Route>
</Router>
);

ReactDOM.render(routes, document.getElementById('root'));
