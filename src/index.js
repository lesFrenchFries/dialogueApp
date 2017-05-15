import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './components/App';
import Booking from './components/pages/Booking';
import Confirmation from './components/pages/Confirmation';

import './index.css';

const routes = (
<Router history={browserHistory}>
  <Route path="/" component={App}>
    <IndexRoute component={Booking}/>
    <Route path="/boards/:id" component={Confirmation}/>
  </Route>
</Router>
);

ReactDOM.render(routes, document.getElementById('root'));
