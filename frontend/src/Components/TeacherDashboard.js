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
        <Grid container justifyContent="center">
            <Typography variant="h4">DASHBOARD</Typography>
        </Grid>
        <Grid>
        <Typography variant="h5">Created Classes</Typography>
        {classesCreated.map((classroom) => (
          <div>
            <TeacherClassCards classroom={classroom}/>
          </div>
        ))}
        </Grid>
        <Grid><Typography variant="h5">Joined Classes</Typography>
        {classesJoined.map((classroom) => (
          <div>
            <StudentClassCards classroom={classroom}/>
          </div>
        ))}
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