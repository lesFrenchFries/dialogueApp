import React from 'react';
import {Link} from 'react-router'
import api from '../../api';
import './booking.css'
var moment = require('moment');

class Booking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weekDispo: [],
    };
  }

  componentWillMount(){
    this._fetchAvailabilities();
  }

  _fetchAvailabilities = () => {
    this.setState({
      weekDispo: api.requestAvailabilities()
      });
  }

  render() {
    let {weekDispo} = this.state;
    let from = moment(weekDispo[0].date, ).format("LL");
    let to=moment(weekDispo[2].date).format("LL");

    return (
      <div className="booking">
        <h2 className="booking-header">Please choose the desired date of your appointment</h2>
        <h3 className="position"> Professional: {this.props.location.query.position}</h3>
        <h4 className="location"> Location: {this.props.location.query.location}</h4>
        <p>{from} to {to}</p>
        <div className="week">
          <i className="fa fa-caret-left" aria-hidden="true"></i>
          <ul className="day">
          {weekDispo.map(a =>
            <Link to={`/booking/${a.date}`} >
              <li key={a.date} className="dayName">
                {moment(a.date).format("dddd")}
              </li>
            </Link>

          )
          }
          </ul>
          <i className="fa fa-caret-right" aria-hidden="true"></i>
        </div>


      </div>
    );
  }

}

export default Booking;
