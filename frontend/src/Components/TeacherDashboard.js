import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchUserClassDetails } from "../actions/classroom";


class TeacherDashboard extends Component {
  componentDidMount() {
    this.props.dispatch(fetchUserClassDetails());
  }
  render() {
    //create the details of the classes joined and created by the user
    const { classesCreated,classesJoined } = this.props.classroom;
    return (
      <div>
        TeacherDashboard
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    classroom: state.classroom,
  };
}

export default connect(mapStateToProps)(TeacherDashboard);