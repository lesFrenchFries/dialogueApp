import React from 'react';

class Login extends React.Component {

  showLock = () => {
    console.log(this.props.auth.login)
    this.props.auth.login();
  }

  render() {
    return (
      <div className="login-box">
        <button onClick={this.showLock}>Login</button>
      </div>
    );
  }

}

export default Login ;
