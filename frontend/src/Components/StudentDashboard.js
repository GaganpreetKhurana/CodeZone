import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchUserClassDetails,clearUserClassDetails } from "../actions/classroom";
import { Link } from 'react-router-dom';
import { Paper,Button,Grid } from '@mui/material';

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
      <Paper>
        <div>
          <Grid container direction="column">
          <Button variant="contained" color="primary">
          This is a button
          </Button>
          <Button variant="contained" color="secondary">
          This is another button
          </Button>
          </Grid>
          <b>Student Dashboard</b><br>
          </br><br></br>
          <b>Classes Joined</b><br></br>
          {classesJoined.map((classroom) => (
            <div className='classroom' key={classroom._id}>
              Subject - {classroom.subject}<br></br>
              Batch  - {classroom.batch}<br></br>
              Description - {classroom.description}<br></br>
              Classroom code - {classroom.code}<br></br>
              CreatedBy - {classroom.creator.name}<br></br>
              Students Enrolled - {classroom.students.length}<br></br>
              <div className="field"><Link to={`/classroom/${classroom._id}`}><button> Enter Classroom</button></Link></div>
            </div>
          ))}
        </div>
      </Paper>
    );
  }
}
function mapStateToProps(state) {
  return {
    classroom: state.classroom,
  };
}

export default connect(mapStateToProps)(StudentDashboard);