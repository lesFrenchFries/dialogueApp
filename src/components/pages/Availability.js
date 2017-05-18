import React from 'react';
import api from '../../api';
import DisplayAvailabilities from '../elements/DisplayAvailabilities';
var moment = require('moment');


class Availability extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dayAvailabilities:[],
      date: this.props.params.date
    }
  }

  componentWillMount(){
    this._fetchAvailabilities();
  }

  _fetchAvailabilities = () => {
    const token = this.props.route.auth.getToken();

    api.reqAvailabilities(this.props.location.query.spec, this.props.params.date, token)
    .then(data =>{
      var date = +moment(this.state.date);
      var avTime = data.find(function(obj){
        return date === +moment(obj.date)
      })

      this.setState({
        dayAvailabilities:avTime.slots,
      })
    })
  }

  render() {
    let {date}=this.state;
    console.log(this.props);
    if(this.state.dayAvailabilities.length > 0){
      return (
          <div className="availability">
            <h3 className="availability-titlte">Please choose an availability for the {date}</h3>
            <ul className="timeSlotList">
              {this.state.dayAvailabilities.map(timeSlot =>
                  <DisplayAvailabilities
                    key={timeSlot.start}
                    data={timeSlot}
                    auth={this.props.route.auth}
                  />
                )
              }
            </ul>
          </div>
        );
    }else{
      return <div>Loading...</div>
    }
  }
}

export default Availability;
