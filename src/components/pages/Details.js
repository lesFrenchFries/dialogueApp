import React from 'react';
import api from '../../api';
import moment from 'moment';

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
    const token = this.props.route.auth.getToken();
    api.reqBookingInfo(this.props.params.id, token)
    .then(data => {
      this.setState({
        info: data,
      })
    })
    }


  render() {
    let {info} = this.state;
    return (
      <div className="confirmation">
        <h2 className="confirmation-title">Your appointment is confirm for {moment(info.time).format("dddd, MMMM Do")} at {moment(info.time).format("hh:mm a ")}</h2>
        <p>
          You will be meeting Dr {info.firstName} {info.lastName} ({info.specialization}) at this address:<br/>
          <span>
            - {info.address}
          </span>
        </p>
      </div>
    );
  }

}

export default Details;
