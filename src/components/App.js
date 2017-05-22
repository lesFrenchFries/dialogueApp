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
            <h2>Welcome to Dialogue</h2>
            <div className="App-item">
              <img className="App-avatar" src={userInfo.picture} alt={userInfo.nickname + ' avatar'}/>
              <p className="App-user">{userInfo.nickname}</p>
              {isMenuOpen
                ? <i className="fa fa-caret-up" aria-hidden="true"
                  onClick={this.closeMenu}
                  />

                : <i className="fa fa-caret-down"
                  onClick={()=>this.setState({ isMenuOpen: !isMenuOpen })}
                  />}
            </div>
          </div>
          <Menu show={isMenuOpen} auth={auth} closeMenu={this.closeMenu}/>
          {this.props.children}
        </div>
      )
    } else {
      return <div>Loading...</div>;
    }
    }

}

export default App;
