import React, { Component } from "react";
import { connect } from "react-redux";
import { clearAuth } from "../actions/auth";
import { createClassroom, clearClassCode } from "../actions/createClassroom";
import { fetchUserClassDetails } from "../actions/classroom";
//
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

class CreateClassPopUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subject: "",
      batch: "",
      description: "",
    };
  }

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
  componentWillUnmount() {
    this.props.dispatch(clearAuth());
  }

  handleSubmitForm = (e) => {
    e.preventDefault();
    const { subject, batch, description } = this.state;
    if (subject && batch) {
      this.props.dispatch(createClassroom(subject, batch, description));
    }
  };
  handleBatch = (e) => {
    this.setState({
      batch: e.target.value,
    });
  };
  handleSubject = (e) => {
    this.setState({
      subject: e.target.value,
    });
  };
  handleDescription = (e) => {
    this.setState({
      description: e.target.value,
    });
  };
  handleClick = () => {
    this.props.toggle();
    this.props.dispatch(clearClassCode());
    this.props.dispatch(fetchUserClassDetails());
  };
  render() {
    const { inProgress, error } = this.props.auth;
    const { code } = this.props.createClassroom;

    return (
        <div>
        <Button variant="contained" onClick={this.dialogOpen}>
            Create
        </Button>
        <Dialog open={this.state.open} onClose={this.dialogClose}>
        <DialogTitle>
            Create Classroom
            {error && <div className="alert error-dailog">{error}</div>}
            {code && (
              <div className="alert success-dailog">
                <p>Classroom creation successfull!!</p>
                <p> Share this code with students &nbsp;</p>
                <b>{code}</b>
              </div>
            )}
        </DialogTitle>
        <DialogContent>
        </DialogContent>
        <DialogActions>
            <TextField
                autoFocus
                margin="dense"
                type="text"
                placeholder="Subject"
                required
                onChange={this.handleSubject}
                fullWidth
                variant="standard"
            />
            <TextField
                autoFocus
                margin="dense"
                type="text"
                placeholder="Batch"
                required
                onChange={this.handleBatch}
                fullWidth
                variant="standard"
            />
            <TextField
                autoFocus
                margin="dense"
                type="text"
                placeholder="Brief Description"
                onChange={this.handleDescription}
                fullWidth
                variant="standard"
            />
            <Button onClick={this.handleSubmitForm} disabled={inProgress}>
            Create
            </Button>
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
  };
}
export default connect(mapStateToProps)(CreateClassPopUp);