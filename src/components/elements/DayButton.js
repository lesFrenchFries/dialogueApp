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
    console.log(moment(dateAv[0]).format("MM-DD-YYYY"))



    for(var i=0; i<7; i++){
      let dayVal = moment().week(week).day(i)

      function validate(e){
        console.log(e, dayVal.format("MM-DD-YYYY"))
        return moment(e).format("MM-DD-YYYY") === dayVal.format("MM-DD-YYYY")
      }

      if(dateAv.some(validate)){
        days.push(
          <Link to={`/booking/${dayVal.format("MM-DD-YYYY")}`} key={dayVal.format("MM-DD-YYYY")}>
            <li className="dayName">
              {dayVal.format("ddd")}
            </li>
          </Link>
        )
      }else{
        days.push(
          <li className="dayName noAv" key={dayVal.format("MM-DD-YYYY")}>
            {dayVal.format("ddd")}
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
