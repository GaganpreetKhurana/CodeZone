import React, { Component } from "react";
import { connect } from "react-redux";
import { clearAuth } from "../actions/auth";
import { joinClassroom, clearClassCode} from "../actions/createClassroom";
import { clearLabDetails, fetchUserClassDetails ,fetchClassLabDetails } from "../actions/classroom";
import TextEditor from "./TextEditor"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom"
import { v4 as uuidV4 } from "uuid"

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

class JoinLabDialog extends Component {
  state = {
      dialogOpen:true
  }

  dialogOpen = () => {
    this.setState({ open: true });
  };

  dialogClose = () => {
    this.setState({ open: false });
    this.props.dispatch(clearClassCode());
    this.props.dispatch(fetchUserClassDetails());
  };

  //to clear the error if it comes on reload or whenever the user shifts from this page
  componentDidMount() {
    //fetch lab details for this classsroom 
    const { classroomId} = this.props;
    this.props.dispatch(fetchClassLabDetails(classroomId));
  }

  componentWillUnmount() {
      //clear lab details
    this.props.dispatch(clearLabDetails());
    this.props.dispatch(clearAuth());
  }
  
  render() {
    const { labDetails } = this.props.labDetails;
    console.log("labDetails",labDetails);
    return (
    <div>
    <Button  fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={this.dialogOpen}>
        Join Lab
    </Button>
      <Dialog open={this.state.open} onClose={this.dialogClose}>
        <DialogTitle>
            Existing Lab Details
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {/*TODO: Need to properly make a link here*/}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Grid item container direction="row">
          {labDetails.map((lab) => (
              <div>
                <Typography variant="h6">
                    {lab.description}
                </Typography>
              </div>
            ))}
        </Grid>
        </DialogActions>
      </Dialog> 
    </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    auth: state.auth,
    createClassroom: state.createClassroom,
    labDetails: state.labDetails,
  };
}
export default connect(mapStateToProps)(JoinLabDialog);

