import React, { Component } from "react";

class JoinClassPopUp extends Component {
  handleClick = () => {
    this.props.toggle();
  };
  render() {
    return (
      <div className="popup-box">
        <div className="box">
            <span className="close-icon" onClick={this.handleClick}>x</span>
            <p>Join a classroom form</p>
        </div>
      </div>
    );
  }
}

export default JoinClassPopUp;
