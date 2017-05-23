import React from 'react';
import api from '../../api';
import DisplayAvailabilities from '../elements/DisplayAvailabilities';
import Confirmation from '../modals/Confirmation';
import './Availability.css'
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
  }

  _fetchAvailabilities = () => {
    if(this.props.route.auth.loggedIn()){
      const token = this.props.route.auth.getToken();

      api.reqAvailabilities(this.props.location.query.spec, this.props.params.date, token)
      .then(data =>{
        console.log(data);
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
    if(this.state.dayAvailabilities.length > 0){
      return (
          <div className="availability">
            <h3 className="availability-title">Please choose an availability <br /><spam>for {moment(date).format("dddd MMMM Do")}</spam></h3>
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
<<<<<<< HEAD

=======

>>>>>>> 27c0ce2153ad9ec9041569c1b32edd699fe532bb
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
    }else if (this.state.loading){
      return (
        <div className="loadingSpinner">
          <i className="fa fa-spinner fa-pulse fa-3x fa-fw blue"></i>
          <span className="sr-only">Loading...</span>
        </div>
      )
    }else{
      this.props.router.push('/home')
      return <div></div>
    }
  }
}

export default Availability;
