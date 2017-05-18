import React from 'react';
import api from '../../api';

import './DisplayAvailabilities.css'

class DisplayAvailabilities extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  _handleTimeSelect = () => {
    const token = this.props.auth.getToken()

    api.sendBooking(this.props.params.date, this.props.data.start, token)
    .then(() => {
      this.props.router.push('/confirmation')
    })
  }


  render() {
    let {data} = this.props
    return (

      <li className="timeSlot" onClick={this._handleTimeSelect}>
        <p>{data.start} - {data.end}</p>
      </li>
    );
  }

}

export default DisplayAvailabilities;
