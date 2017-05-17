import Auth0Lock from 'auth0-lock'
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

    this.lock.getUserInfo(authResult.accessToken, function(err, profile){
      if(err) {
        console.log(err);
      }
      else {
        localStorage.setItem('profile', JSON.stringify(profile));
      }
    })
  }

  getUserInfo = () => {
    // Retrieves the profile data from local storage
   const profile = localStorage.getItem('profile')
   return profile ? JSON.parse(localStorage.profile) : {}
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
