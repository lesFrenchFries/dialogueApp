import React from 'react';
import './DisplayAvailabilities.css'

class DisplayAvailabilities extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  _handleSubmit = () => {
    this.props.whenSubmit(true, this.props.data.start);
  }

  render() {
    let {data} = this.props
    return (
        <li className="timeSlot" onClick={this._handleSubmit}>
          <p>{data.start} - {data.end}</p>
        </li>
    );
  }

}

export default DisplayAvailabilities;
