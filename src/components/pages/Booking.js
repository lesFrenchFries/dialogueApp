import React from 'react';

class Booking extends React.Component {

  _handleLogout = () => {
    this.props.auth.logout()
    .then(res => {
      this.props.router.push('/');
    })
  }

  render() {
    {console.log(this.props, this.params)}
    return (
      <div>
        <h2 className="booking-header">Please choose the desired date of your appointment</h2>
        <h3 className="position"> With a {this.props.location.query.position}</h3>
        <h4 className="location"> In {this.props.location.query.location}</h4>
      </div>
    );
  }

}

export default Booking;
