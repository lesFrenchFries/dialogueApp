import React from 'react';
import api from '../../api';
import './Booking.css';
import DayButton from '../elements/DayButton';
var moment = require('moment');

class Booking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weekNum: moment().week(),
      weekAvailabilities: []
    }
  }

  componentWillMount(){
    this._fetchAvailabilities();
  }

  _fetchAvailabilities = () => {
    api.requestAvailabilities()
    .then(data=>{
      this.setState({
        weekAvailabilities: data.map(obj=>obj.date)
        });
    })
  }

  _handlePrevWeek = () => {
    this.setState({
      weekNum: this.state.weekNum - 1
    })
  }

  _handleNextWeek = () => {
    this.setState({
      weekNum: this.state.weekNum + 1
    })
  }

  render() {
    let {weekAvailabilities, weekNum} = this.state;

    if(weekAvailabilities.length > 0){
      let from = moment().day("sunday").week(weekNum).format("LL");
      let to = moment().day("saturday").week(weekNum).format("LL");

      return (
        <div className="booking">
          <h2 className="booking-header">Please choose the desired date of your appointment</h2>
          <h3 className="position"> Professional: {this.props.location.query.position}</h3>
          <h4 className="location"> Location: {this.props.location.query.location}</h4>
          <p>{from} to {to}</p>
          <div className="week">
            <i className="fa fa-caret-left" aria-hidden="true" onClick={this._handlePrevWeek}></i>
              <DayButton className="day"
                week={weekNum}
                dateAv={weekAvailabilities}
               />
            <i className="fa fa-caret-right" aria-hidden="true" onClick={this._handleNextWeek}></i>
          </div>


        </div>
      );
    }else{return <div>Loading...</div>}

    }

}

export default Booking;
