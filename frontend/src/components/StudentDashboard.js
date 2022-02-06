import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchUserClassDetails,clearUserClassDetails } from "../actions/classroom";
import { Grid } from '@mui/material';
import StudentClassCards from './StudentClassCards';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import { Box } from '@mui/system';

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
        <Box m={4}>
          <Grid container direction="column" height="100vh">
            <Grid
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
            >{
              classesJoined?.length < 1 && <Typography variant="h6">No classes to display!!!</Typography>
            }
              {classesJoined.map((classroom) => (
                <div key={classroom.id}>
                  <Container>
                    <StudentClassCards classroom={classroom} />
                  </Container>
                </div>
              ))}
            </Grid>
          </Grid>
        </Box>
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