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
          <Grid container justifyContent="center">
            <Typography variant="h4">
                DASHBOARD
            </Typography>
          </Grid>
          {classesJoined.map((classroom) => (
              <div>
                <StudentClassCards classroom={classroom}/>
              </div>
            ))}
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