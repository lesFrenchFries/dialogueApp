import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import App from './components/App';
import Booking from './components/pages/Booking';
import Confirmation from './components/pages/Confirmation';
import Login from './components/pages/Login';

import './index.css';

const routes = (
<Router history={browserHistory}>
  <Route path="/" component={App}>
    <Route path="/login" component={Login}/>
    <Route path="/booking" component={Booking}/>
    <Route path="/confirmation" component={Confirmation}/>
  </Route>
</Router>
);

ReactDOM.render(routes, document.getElementById('root'));
