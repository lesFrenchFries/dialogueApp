import React, { Component } from 'react';
import Login from './pages/Login';
import Booking from './pages/Booking'
import AuthService from '../utils/AuthService'
import './App.css';

const auth = new AuthService('mDjKJ-cjHls9d694dX7VpOqFgM8573KE', 'dialogue-app.auth0.com')

class App extends Component {

  render() {
    return (
      <div>
          {console.log(auth)}
          <h2>Welcome to Dialogue</h2>
          {!auth.loggedIn()?
          <Login auth={auth}/>:
          <p>This user is connected</p>}

      </div>
    )
  }
}

export default App;
