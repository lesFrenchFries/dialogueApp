import React from 'react';
import './DisplayBookings.css';
import moment from 'moment';

class DisplayBookings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    let {info} = this.props
    info.time = info.time.split("T").join(" ").split(":", 2).join(":").split(" ");
    if(moment().isBefore(info.time[0])){
      return (
        <div className="my_bookings">
          <h4>{moment(info.time[0]).format("dddd, MMMM Do")} <br/> {info.time[1]}</h4>
          <p>
            With {info.firstName} {info.lastName}
          <br/>
            ({info.specialization})
          </p>
        </div>
      );
    }else{
      return(
        <div className="my_bookings prev_bookings">
          <h4>{moment(info.time[0]).format("dddd, MMMM Do")} <br/> {info.time[1]}</h4>
          <p>
            With {info.firstName} {info.lastName}
          <br/>
            ({info.specialization})
          </p>
        </div>
      )
    }
  }
}

export default DisplayBookings;
