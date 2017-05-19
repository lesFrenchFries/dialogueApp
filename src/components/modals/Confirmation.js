import React from 'react';
import api from '../../api.js';
import { browserHistory } from 'react-router';

class Confirmation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  _handleConfirmation = () => {

    const token = this.props.auth.getToken();
    console.log(token, this.props.date, this.props.start, this.props.spec);
    api.sendBooking(this.props.date, this.props.start, token, this.props.spec)
    .then(res => {
      browserHistory.push('/bookings/${res.body.insertId}')
    })
  }

    render() {
      return (
        <div className="confirmation-form">
          <h3 className="confirmation-title">Confirmation</h3>
          <p>Your appointment is {this.props.date} at {this.props.start} for a {this.props.spec}</p>
          <div className="confirmation-button">
            <button onClick={this._handleConfimation}>Confirm</button>
          </div>
        </div>
      );
    }
}

export default Confirmation ;
