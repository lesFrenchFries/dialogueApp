import React, { Component } from 'react';
import onClickOutside from 'react-onclickoutside';
import './Menu.css'


class Menu extends Component {

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
