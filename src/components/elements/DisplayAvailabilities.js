import React from 'react';
var moment = require('moment');

import './DisplayAvailabilities.css'

class DisplayAvailabilities extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  _handleTimeSelect = () => {

  }


  render() {
    let {data} = this.props

    return (
      <li key={data.start} className="timeSlot" onClick={this._handleTimeSelect}>
        <p>{moment(data.start).format("HH:mm")}</p><hr/>
        <p>{moment(data.end).format("HH:mm")}</p>
      </li>
    );
  }

}

export default DisplayAvailabilities;
