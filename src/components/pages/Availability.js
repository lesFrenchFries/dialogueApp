import React from 'react';
import api from '../../api';
import DisplayAvailabilities from '../elements/DisplayAvailabilities'
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
    api.requestAvailabilities()
    .then(data =>{
      var date = +moment(this.state.date);
      var avTime = data.find(function(obj){
        return date === +moment(obj.date)
      })

      this.setState({
        dayAvailabilities:avTime.availabilities,
      })
    })
  }

  render() {
    console.log(this.state.dayAvailabilities)
    if(this.state.dayAvailabilities.length > 0){
      return (
        <div>
          <ul className="timeSlotList">
            {this.state.dayAvailabilities.map(timeSlot => {
                console.log(timeSlot);
                <DisplayAvailabilities
                  data={this.state.dayAvailabilities}
                />
              })
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
