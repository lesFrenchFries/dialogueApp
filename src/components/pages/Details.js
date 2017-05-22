import React from 'react';
import api from '../../api';
import moment from 'moment';
import './Details.css'

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
    if(Object.keys(info).length>0){
      info.time = info.time.split("T").join(" ").split(":", 2).join(":").split(" ");
      return (
        <div className="booking_details">
          <h3 className="details_title">Your appointment is confirm:</h3>
          <h2>{moment(info.time[0]).format("dddd, MMMM Do")} at {info.time[1]}</h2>
          <p>
            You will be meeting {info.firstName} {info.lastName} ({info.specialization})
          </p>
        </div>
      );
    }else{
      return (<div>Loading...</div>)
    }
  }

}

export default Details;
