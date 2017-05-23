import React from 'react';
import api from '../../api';
import DisplayAvailabilities from '../elements/DisplayAvailabilities';
import Confirmation from '../modals/Confirmation';
import './Availability.css';

var moment = require('moment');


class Availability extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dayAvailabilities:[],
      date: this.props.params.date,
      display: false,
      bookingStart: "",
      loading: true,
    }
  }

  componentWillMount(){
    this._fetchAvailabilities();
  }

  componentDidUpdate(prevState){
    if(prevState.display !== this.state.display) {
      this._scrollOrNot()
    }

    if(prevState.loading !== this.state.loading){
      if(this.state.dayAvailabilities.length===0 && !this.state.loading){
        this.props.router.push('/home')
      }
    }
  }

  _fetchAvailabilities = () => {
    if(this.props.route.auth.loggedIn()){
      const token = this.props.route.auth.getToken();

      api.reqAvailabilities(this.props.location.query.spec, this.props.params.date, token)
      .then(data =>{
        var date = +moment(this.state.date);
        var avTime = data.find(function(obj){
          return date === +moment(obj.date, 'ddd MMM DD YYYY')
        })

        this.setState({
          dayAvailabilities:avTime.slots,
          loading: false
        })
      })
    }
  }

  _handleClick = (clicked,startTime) => {
    this.setState({
      display: clicked,
      bookingStart: startTime,
    })
  }

  _handleCancel = (cancel) => {
    this.setState({
      display: cancel,
    })
  }

  _scrollOrNot = () => {
    let body = document.getElementsByTagName("body")[0];
    if(this.state.display){
      body.classList.add("scrollOrNo")
    }else{
      body.classList.remove("scrollOrNo")
    }
  }

  render() {
    let {date}=this.state;
    let time = this.state.dayAvailabilities;
    let beforeNoon = [];
    let afterNoon = [];

    if(this.state.dayAvailabilities.length > 0){
      for (var i = 0; i < time.length; i++) {
        if (time[i].start <= "12:00") {
          beforeNoon.push(time[i])
        }
        else {
          afterNoon.push(time[i])
        }
      }
      return (
          <div className="availability">
            <h3 className="availability-title">Please choose an availability for {this.props.location.query.spec}<br /><spam>for {moment(date).format("dddd MMMM Do")}</spam></h3>
            {this.state.display ?
              <div className="popUpForm">
                <Confirmation
                  date={this.state.date}
                  start={this.state.bookingStart}
                  spec={this.props.location.query.spec}
                  auth={this.props.route.auth}
                  whenCancel={this._handleCancel}
                />
              </div> : null}
            <ul className="timeSlotList">
              {beforeNoon.map(timeSlot => {
                  return(
                    <DisplayAvailabilities whenSubmit={this._handleClick}
                      key={timeSlot.start}
                      data={timeSlot}
                      date={this.state.date}
                      auth={this.props.route.auth}
                    />
                  )
                })
              }
            </ul>
            {afterNoon.length > 0 && beforeNoon.length > 0 ?
                  <div className="noon">
                    <div className="separator"></div>
                    <p>NOON</p>
                    <div className="separator"></div>
                  </div> : null
            }

            <ul className="timeSlotList">
              {afterNoon.map(timeSlot => {
                  return(
                    <DisplayAvailabilities whenSubmit={this._handleClick}
                      key={timeSlot.start}
                      data={timeSlot}
                      date={this.state.date}
                      auth={this.props.route.auth}
                    />
                  )
                })
              }
            </ul>
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

export default Availability;
