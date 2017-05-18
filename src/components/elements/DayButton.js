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
    let {data, specialists} = this.props;;
    let days = [];

    data.forEach(obj=>{
      let dayVal = moment(obj.date);
      if(obj.slots.length >0){
        days.push(
          <Link to={`/booking/${dayVal.format("YYYY-MM-DD")}?spec=${specialists}`} key={obj.date}>
            <li className="dayName">
              {dayVal.format("ddd")}<hr/>
              {dayVal.format("DD")}
            </li>
          </Link>
        )
      }else{
        days.push(
          <li className="dayName noAv" key={obj.date}>
            <span>{dayVal.format("ddd")}<hr/>
            {dayVal.format("DD")}</span>
          </li>
        )
      }
    })

    return (
      <ul className="day">
        {days}
      </ul>
    );
  }

}

export default DayButton;
