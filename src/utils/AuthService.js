import Auth0Lock from 'auth0-lock'
import { browserHistory } from 'react-router'
import { isTokenExpired } from './jwtHelper'

export default class AuthService {
  constructor(clientId, domain) {
    // Configure Auth0
    this.lock = new Auth0Lock(clientId, domain, {
        allowedConnections: ['Username-Password-Authentication'],
        responseType: 'token'
      }
    )
    // Add callback for lock `authenticated` event
    this.lock.on('authenticated', this._doAuthentication.bind(this))
  }

  _doAuthentication(authResult) {
    // Saves the user token
    this.setToken(authResult.idToken)
    // navigate to the home route
    browserHistory.replace('/booking')
  }

  login = () => {
    // Call the show method to display the widget.
    this.lock.show()
  }

  loggedIn = () => {

    return this.getToken() && !isTokenExpired(this.getToken());
  }

  setToken = (idToken) => {
    // Saves user token to local storage
    localStorage.setItem('id_token', idToken)
  }

  getToken = () => {
    // Retrieves the user token from local storage
    return localStorage.getItem('id_token')
  }

  logout = () => {
    // Clear user token and profile data from local storage
    localStorage.removeItem('id_token');
  }
}
