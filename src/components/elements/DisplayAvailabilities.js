import React from 'react';
import api from '../../api';
import './DisplayAvailabilities.css'

class DisplayAvailabilities extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  _handleSubmit = () => {
    this.props._whenSubmit(true);
  }

  render() {
    let {data} = this.props
    return (
        <li className="timeSlot" OnClick={this._handleSubmit}>
          <p>{data.start} - {data.end}</p>
        </li>
    );
  }

}

export default DisplayAvailabilities;
