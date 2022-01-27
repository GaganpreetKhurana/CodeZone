import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchUserClassDetails,clearUserClassDetails } from "../actions/classroom";
import { Grid } from '@mui/material';
import StudentClassCards from './StudentClassCards';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';

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
        <div>
          <Grid container direction="column">
            <Grid
              m={4}
              item
              container
              justifyContent="space-evenly"
              alignItems="center"
            >
              <Typography variant="h4">CLASSES</Typography>
            </Grid>
            <Grid
              item
              container
              direction="row"
              justifyContent="space-evenly"
              alignItems="center"
            >
              {classesJoined.map((classroom) => (
                <div key={classroom.id}>
                  <Container>
                    <StudentClassCards classroom={classroom} />
                  </Container>
                </div>
              ))}
            </Grid>
          </Grid>
        </div>
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