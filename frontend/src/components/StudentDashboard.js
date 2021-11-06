import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchUserClassDetails,clearUserClassDetails } from "../actions/classroom";
import { Grid } from '@mui/material';
import StudentClassCards from './StudentClassCards';
import Typography from '@mui/material/Typography';


class StudentDashboard extends Component {
  componentDidMount() {
    this.props.dispatch(fetchUserClassDetails());
  }
  componentWillUnmount() {
    this.props.dispatch(clearUserClassDetails());
  }

  render() {
    //create the details of the classes joined by the user
    const { classesJoined } = this.props.classroom;
    return (
        <div>
          <Grid container direction="column" justifyContent="space-between" alignItems="center" >
          <Grid container justifyContent="center">
            <Typography variant="h4">
                DASHBOARD
            </Typography>
          </Grid>
          <Grid container direction="row" justifyContent="space-evenly" alignItems="center">
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

export default connect(mapStateToProps)(StudentDashboard);