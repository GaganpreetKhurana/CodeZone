import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchUserClassDetails } from "../actions/classroom";


class StudentDashboard extends Component {
  componentDidMount() {
    this.props.dispatch(fetchUserClassDetails());
  }
  render() {
    //create the details of the classes joined by the user
    const { classesCreated,classesJoined } = this.props.classroom;
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