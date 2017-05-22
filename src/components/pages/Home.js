import React from 'react';
import api from '../../api';

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
    const token = this.props.route.auth.getToken();

    api.reqPatientBooking(token)
    .then(data => {
      this.setState({
        patientBooking:data
      })
    })
  }

  render() {
    console.log(this.state.patientBooking)
    return (
      <div>Home</div>
    );
  }

}

export default Home;
