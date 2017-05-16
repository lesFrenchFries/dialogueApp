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
        Booking
      </div>
    );
  }

}

export default Booking;
