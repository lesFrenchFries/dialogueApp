import React from 'react';

class Availability extends React.Component {

  render() {
    return (
      <div className="availability">
        <h3 className="availability-titlte">Please choose an availability for the {this.props.params.date}</h3>
        <ul className="availability-liste"></ul>
      </div>
    );
  }
}

export default Availability;
