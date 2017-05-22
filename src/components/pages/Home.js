import React from 'react';
import api from '../../api';
import DisplayBookings from '../elements/DisplayBookings';
import './Home.css'

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      patientBooking:[],
    }
  }

  componentWillMount(){
    this._fetchPatientBooking();
  }


  _fetchPatientBooking = () => {
    if(this.props.route.auth.loggedIn()){
      const token = this.props.route.auth.getToken();

      api.reqPatientBooking(token)
      .then(data => {
        this.setState({
          patientBooking:data
        })
      })
    }
  }

  render() {
    if(this.state.patientBooking.length > 0){
      return (
        <div>
          <h3 className="home_title">Your past and upcoming appointments</h3>
          <div className="all_bookings">
            {this.state.patientBooking.map(b => {
              return (
                <DisplayBookings
                  key={b.id}
                  info={b}
                />)
              })
            }
          </div>
        </div>
      );
    }else{
      return (
        <div className="loadingSpinner">
          <i className="fa fa-spinner fa-pulse fa-3x fa-fw blue"></i>
          <span className="sr-only">Loading...</span>
        </div>
      )
    }
  }

}

export default Home;
