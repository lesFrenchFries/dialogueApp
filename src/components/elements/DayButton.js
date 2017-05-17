import React from 'react';
import {Link} from 'react-router';
var moment = require('moment');
import '../elements/DayButton.css'

class DayButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    let {week} = this.props;;
    let days = [];

    for(var i=0; i<7; i++){
      let dayVal = moment().week(week).day(i)
      days.push(
        <Link to={`/booking/${dayVal.format("MM-DD-YYYY")}`} key={dayVal.format("MM-DD-YYYY")}>
          <li className="dayName">
            {dayVal.format("ddd")}
          </li>
        </Link>
      );
    }

    return (
      <ul className="day">
        {days}
      </ul>
    );
  }

}

export default DayButton;
