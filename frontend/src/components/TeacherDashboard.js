import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchUserClassDetails,clearUserClassDetails } from "../actions/classroom";
import StudentClassCards from './StudentClassCards';
import TeacherClassCards from './TeacherClassCards';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';

class TeacherDashboard extends Component {
  componentDidMount() {
    this.props.dispatch(fetchUserClassDetails());
  }
  componentWillUnmount() {
    this.props.dispatch(clearUserClassDetails());
  }
  render() {
    //create the details of the classes joined and created by the user
    const { classesCreated,classesJoined } = this.props.classroom;

    return (
      <div>
        <Grid container direction="column" justifyContent="space-between" alignItems="center" >
        <Grid m={5} container justifyContent="center">
            <Typography variant="h4">DASHBOARD</Typography>
        </Grid>
        <Typography variant="h5">Created Classes</Typography>
        <Grid item container direction="row" justifyContent="space-evenly" alignItems="center">
        {classesCreated.map((classroom) => (
          <div>
            <TeacherClassCards classroom={classroom}/>
          </div>
        ))}
        </Grid>
        <Typography variant="h5">Joined Classes</Typography>
        <Grid item container direction="row" justifyContent="space-evenly" alignItems="center">
        {classesJoined.map((classroom) => (
          <div>
            <StudentClassCards classroom={classroom}/>
          </div>
        ))}
        </Grid>
        </Grid>
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