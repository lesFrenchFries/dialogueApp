import React from 'react';
import api from '../../api';

class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info:{},
    }
  }

  componentWillMount(){
    this._fetchBookingInfo();
  }

  _fetchBookingInfo = () => {
    api.reqBookingInfo(this.props.params.id)
    .then(data => {
      this.setState({
        info: {data},
      })
    })
    }


  render() {
    return (
      <div className="confirmation">
        <h2 className="confirmation-title">Your appointment is confirm for {this.info.time}</h2>
        <p>
          You will be meeting Dr {this.info.firstName} {this.info.lastName} ({this.info.specialization}) at this address:
          <span>
            - {this.info.address}
          </span>
        </p>
      </div>
    );
  }

}

export default Details;
