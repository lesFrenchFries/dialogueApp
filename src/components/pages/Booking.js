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
      weekAvailabilities: [],
      loading: true
    }
  }

  componentWillMount(){
    this._fetchAvailabilities();
  }

  componentDidUpdate(prevProps, prevState){
    if(prevState.weekNum !== this.state.weekNum){
      this._fetchAvailabilities();
      this.setState({loading: true})
    }
  }

  _fetchAvailabilities = () => {
    const token = this.props.route.auth.getToken();
    api.reqAvailabilities(this.props.location.query.position, moment().day("sunday").week(this.state.weekNum).format("YYYY-MM-DD"), token)
    .then(data=>{
      this.setState({
        weekAvailabilities: data,
        loading: false,
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
    let from = moment().day("sunday").week(weekNum).format("LL");
    let to = moment().day("saturday").week(weekNum).format("LL");
    console.log("week",from, to)
    console.log("availabilities", this.state.weekAvailabilities)

    return (
      <div className="booking">
        <h2 className="booking-header">Please choose the desired date of your appointment</h2>
        <h3 className="position"> Professional: {this.props.location.query.position}</h3>
        <h4 className="location"> Location: {this.props.location.query.location}</h4>
        <p>{from} to {to}</p>
        <div className="week">
          <i className="fa fa-caret-left" aria-hidden="true" onClick={this._handlePrevWeek}></i>
          {(this.state.loading || !weekAvailabilities.length)
            ? <div className="loading">Loading...</div>
            : <DayButton className="day"
                week={weekNum}
                data={weekAvailabilities}
                specialists={this.props.location.query.position}
               />
          }
          <i className="fa fa-caret-right" aria-hidden="true" onClick={this._handleNextWeek}></i>
        </div>
      </div>
    );
  }

}

export default Booking;
