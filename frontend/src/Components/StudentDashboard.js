import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchUserClassDetails } from "../actions/classroom";


class StudentDashboard extends Component {
  componentDidMount() {
    console.log("user detials req sent");
    this.props.dispatch(fetchUserClassDetails());
  }
  render() {
    const { userDetails } = this.props.classroom;
    console.log(userDetails);
    return (
      <div>
        Student Dashboard
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    classroom: state.classroom,
  };
}

export default connect(mapStateToProps)(StudentDashboard);