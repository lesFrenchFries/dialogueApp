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
    let { data, specialists} = this.props;
    let days = [];
    let now = moment().format("YYYY-MM-DD")

    data.forEach(obj=>{
      if(obj.slots.length > 0 && moment(now).isSameOrBefore(obj.date)){
        days.push(
          <Link to={`/bookings/${moment(obj.date).format("YYYY-MM-DD")}?spec=${specialists}`} key={obj.date}>
            <li className="dayName dayName-md">
              {moment(obj.date).format("ddd")}<hr/>
              {moment(obj.date).format("DD")}
            </li>
          </Link>
        )
      }else{
        days.push(
          <li className="dayName dayName-md noAv noAv-md" key={obj.date}>
            <span>{moment(obj.date).format("ddd")}<hr/>
            {moment(obj.date).format("DD")}</span>
          </li>
        )
      }
    })

    return (
      <ul className="day day-md">
        {days}
      </ul>
    );
  }

}

export default DayButton;
