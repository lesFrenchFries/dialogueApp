import React from 'react';
import api from '../../api';

class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentWillMount(){
    this._fetchBookingInfo();
  }

  _fetchBookingInfo = () => {

    }


  render() {
    return (
      <div></div>
    );
  }

}

export default Details;
