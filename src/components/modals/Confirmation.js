import React from 'react';
import api from '../../api.js';
import { browserHistory } from 'react-router';
import './Confirmation.css';
import moment from 'moment';

class Confirmation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  _handleConfirmation = () => {
    if(this.props.auth.loggedIn()){
      const token = this.props.auth.getToken();
      const mail = this.props.auth.getUserInfo();
      api.sendBooking(this.props.date, this.props.start, token, this.props.spec, mail.email, mail.picture)
      .then(res => {
        browserHistory.push(`/booking/${res.body.id}`)
      })
    }
  }

  _handleCancelButton = () => {
    this.props.whenCancel(false);
  }

    render() {
      return (
        <div className="confirmation_form confirmation_form_md">
          <h3 className="confirmation_title">Confirmation</h3>
          <p>Please confirm your appointment with a {this.props.spec} on {moment(this.props.date).format("dddd LL")} at {this.props.start}</p>
          <button type="button" className="confirmation_button" onClick={this._handleConfirmation}>Confirm</button>
          <p className="confirmation_cancel" onClick={this._handleCancelButton}>Cancel</p>
        </div>
      );
    }
}

export default Confirmation ;
