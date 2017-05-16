import React from 'react';
import {Link} from 'react-router'
import api from '../../api';
// import dayButton from '../elements/dayButton'
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
      <div>
        <h2 className="booking-header">Please choose the desired date of your appointment</h2>
        <h3 className="position"> With a {this.props.location.query.position}</h3>
        <h4 className="location"> In {this.props.location.query.location}</h4>
        <div className="week">
          <p>{from} to {to}</p>
          {weekDispo.map(a =>
            <Link to={`/booking/${a.date}`} className="day" key={a.date}>
              {moment(a.date).format("dddd")}
            </Link>
            )
          }
        </div>

      </div>
    );
  }

}

export default Booking;
