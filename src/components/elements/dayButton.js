import React, {Component} from 'react';
import {Link} from 'react-router'
var moment = require('moment');

class dayButton extends Component {
  constructor(props) {
    super(props);
    this.state={};
  }

  render() {
    let {date, availabilities} = this.props
    console.log(date)
    return (
      <Link to={`/booking/${date}`} className="day">
        this is: {moment(date).format("dddd")}
      </Link>
    );
  }

}

export default dayButton;
