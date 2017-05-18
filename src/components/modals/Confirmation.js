import React from 'react';

const ENTER = 13;
class Confirmation extends React.Component {constructor(props) {

    super(props);
    this.state = {
    };
  }

  _handleClick = () => {

  }

  _handleTyping = (e) => {
    if (e.keyCode===ENTER) {
      this._handleClick();
    }
  }

    render() {
      return (
        <div className="confirmation-form">
          <h3 className="confirmation-title">Confirmation</h3>
          <p>Your appointment is {this.props.date} at {this.props...} for a {this.props.location.query.position} specialiste</p>
          <div className="confirmation-button">
            <button
             onClick= this._handleClick
             onKeyUp= this._handleTyping>
             Confrim</button>
          </div>
        </div>
      );
  }

}

export default Confirmation ;
