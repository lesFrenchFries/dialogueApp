import React from 'react';

class Booking extends React.Component {

  _handleLogout = () => {
    this.props.auth.logout()
    .then(res => {
      this.props.router.push('/');
    })
  }

  render() {
    return (
      <div>
        allo Nico!
      </div>
    );
  }

}

export default Booking;
