import React from 'react';
import {browserHistory} from 'react-router';
var moment = require('moment');

class SwitchDateMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  _handleSelectChange = (event) => {
    var changeDate = event.target.value
    console.log(changeDate);
    console.log(this.props);
    browserHistory.push(`/booking/${changeDate}`)
  }

  render() {
    let {date}=this.props
    var selectValues=[];

    function thisWeek(d){
      for(var i=0; i<7; i++){
        let otherDate=moment(d).day(i).format("YYYY-MM-DD")

        if(d !== otherDate){
          selectValues.push(
            <option key={otherDate} value={otherDate}>
                {otherDate}
            </option>
          );
        }else{
          selectValues.push(
            <option key={d} value={otherDate}  className="thisDate" disabled>
              {d}
            </option>
          );
        }
      }
    }

    thisWeek(date);

    return (
      <select defaultValue={date} className="switchDate" onChange={this._handleSelectChange}>
        {selectValues}
      </select>
    );
  }

}

export default SwitchDateMenu;
