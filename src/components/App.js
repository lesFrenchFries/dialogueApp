import React, { Component } from 'react';
import './App.css';
import Menu from './modals/Menu';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isMenuOpen: false,
      userInfo: {}
    };
  }

  closeMenu = () => {
    this.setState({ isMenuOpen: false })
  }

  _getUserInfo = () => {
      this.setState({userInfo:this.props.route.auth.getUserInfo()})
    }

  _handleRedirect = (path) => {
    this.props.router.push(path)
  }

  componentWillMount() {
    this._getUserInfo();
  }

  render() {
    let {userInfo} = this.state;
    let {isMenuOpen} = this.state;
    let {auth} = this.props.route;
    if (Object.keys(userInfo).length > 0){
      return (
        <div>
          <div className="App-navbar">
            <img className="App-logo" src="/logo-white.png" alt="logo dialogue"/>
            <img className="App-avatar" src={userInfo.picture} alt={userInfo.nickname + ' avatar'}
            onClick={()=>this.setState({ isMenuOpen: !isMenuOpen })}/>
          </div>
          <Menu show={isMenuOpen} auth={auth} closeMenu={this.closeMenu} nickname={userInfo.nickname} router={this._handleRedirect}/>
          {this.props.children}
        </div>
      )
    } else {
      return <div>Loading...</div>;
    }
    }

}

export default App;
