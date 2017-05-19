import React from 'react';
import api from '../../api';
import DisplayAvailabilities from '../elements/DisplayAvailabilities';
import Confirmation from '../modals/Confirmation';
var moment = require('moment');


class Availability extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dayAvailabilities:[],
      date: this.props.params.date,
      display: false
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
  _handleClick = (clicked) => {
    this.setState({
      display: clicked,
    })
  }

  render() {
    let {date}=this.state;
    if(this.state.dayAvailabilities.length > 0){
      return (
          <div className="availability">
            <h3 className="availability-titlte">Please choose an availability for {moment(date).format("dddd MMMM Do")}</h3>
            {this.state.display ?
                <Confirmation
                  date={this.state.date}
                  start={this.props.data.start}
                  spec={this.props.location.query.spec}
                  auth={this.props.auth}
                />  : null}
            <ul className="timeSlotList">
              {this.state.dayAvailabilities.map(timeSlot =>
                  <DisplayAvailabilities whenSubmit={this._handleClick}
                    key={timeSlot.start}
                    data={timeSlot}
                    date={this.state.date}
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
