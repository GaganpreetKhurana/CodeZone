import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchUserClassDetails,clearUserClassDetails } from "../actions/classroom";
import { Grid } from '@mui/material';
import StudentClassCards from './StudentClassCards';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import { Box } from '@mui/system';
import { Paper } from '@mui/material';

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
          <Grid container component="main" sx={{ height: "100vh" }}>
            <Grid
              item
              xs={false}
              sm={3}
              md={4}
              sx={{
                backgroundColor: (t) =>
                  t.palette.mode === "light"
                    ? t.palette.grey[50]
                    : t.palette.grey[900],
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <Box
                sx={{
                  pt: 8,
                  pb: 6,
                }}
                m={4}
              >
                <Typography
                  component="h1"
                  variant="h2"
                  align="center"
                  color="text.primary"
                >
                  Classrooms
                </Typography>
                <Typography
                  variant="h5"
                  align="center"
                  color="text.secondary"
                  paragraph
                >
                  Join a classroom or enter into an already joined one
                </Typography>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              sm={9}
              md={8}
              component={Paper}
              elevation={6}
              square
            >
              <Grid direction="column">
                <Grid
                  item
                  container
                  direction="row"
                  justifyContent="space-evenly"
                  alignItems="center"
                >
                  {classesJoined?.length < 1 && (
                    <Typography variant="h6">
                      No classes to display!!!
                    </Typography>
                  )}
                  {classesJoined.map((classroom) => (
                    <div key={classroom.id}>
                      <Container>
                        <StudentClassCards classroom={classroom} />
                      </Container>
                    </div>
                  ))}
                </Grid>
              </Grid>
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