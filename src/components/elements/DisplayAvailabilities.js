import React from 'react';

class DisplayAvailabilities extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    console.log(this.props);
    let {data} = this.props

    return (
      <div></div>
    );
  }

}

export default DisplayAvailabilities;
