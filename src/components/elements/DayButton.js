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
    let {week, dateAv} = this.props;;
    let days = [];
    
    for(var i=0; i<7; i++){
      let dayVal = moment().week(week).day(i)

      function validate(e){
        return moment(e).format("MM-DD-YYYY") === dayVal.format("MM-DD-YYYY")
      }

      if(dateAv.some(validate)){
        days.push(
          <Link to={`/booking/${dayVal.format("MM-DD-YYYY")}`} key={dayVal.format("MM-DD-YYYY")}>
            <li className="dayName">
              {dayVal.format("ddd")}<hr/>
              {dayVal.format("DD")}
            </li>
          </Link>
        )
      }else{
        days.push(
          <li className="dayName noAv" key={dayVal.format("MM-DD-YYYY")}>
            <span>{dayVal.format("ddd")}<hr/>
            {dayVal.format("DD")}</span>
          </li>
        )
      }
    }

    return (
      <ul className="day">
        {days}
      </ul>
    );
  }

}

export default DayButton;
