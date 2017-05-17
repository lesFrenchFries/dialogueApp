import React, { Component } from 'react';
import onClickOutside from 'react-onclickoutside';
import './Menu.css'


class Menu extends Component {

  // constructor() {
  //   super();
  //   this.state = {
  //     userInfo: {}
  //   };
  // }
  //
  // componentWillMount = () => {
  //     this.getUserInfo();
  //   }
  //
  //
  // getUserInfo= () => {
  //   if(auth.isLoggedIn()){
  //     auth.userInfo()
  //     .then(res=>{
  //       this.setState({
  //         userInfo: res.body
  //       });
  //     });
  //   }
  // }

  _handleLogoutButton= () => {
    this.props.auth.logout();

  }

  handleClickOutside = () => {
    this.props.closeMenu();
  }

  render() {
    let { closeMenu, show } = this.props;
    const loggedIn = this.props.auth.loggedIn();

    return (
      <div>
        <div className={`menu ${show?"show":""}`}>
            {loggedIn ?
              <div className="menu__item" onClick={closeMenu}>
                <button type="button" onClick={this._handleLogoutButton}>Logout</button>
              </div>
            :null}
        </div>
      </div>
    );
  }

}

export default onClickOutside(Menu);
