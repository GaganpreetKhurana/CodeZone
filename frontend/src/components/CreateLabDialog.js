import React, { Component } from "react";
import { connect } from "react-redux";
import { clearAuth } from "../actions/auth";
import { createNewLab, clearClassCode } from "../actions/createClassroom";

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

class CreateLabDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question:"",
      input:"",
      output:"",
      language:"",
      maxMarks:"",
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
  };

  //to clear the error if it comes on reload or whenever the user shifts from this page
  componentWillUnmount() {
    this.props.dispatch(clearAuth());
  }

  handleSubmitForm = (e) => {
    e.preventDefault();
    const { classroomId} = this.props;
    const { description, question, input, output, language, maxMarks } = this.state;
    if (description && classroomId) {
      this.props.dispatch(createNewLab(description, question, input, output, language, maxMarks,classroomId));
    }
  };
  handleDescription = (e) => {
    this.setState({
      description: e.target.value,
    });
  };
  handleQuestion = (e) => {
    this.setState({
      question: e.target.value,
    });
  };
  handleInput = (e) => {
    this.setState({
      input: e.target.value,
    });
  };
  handleOutput = (e) => {
    this.setState({
      output: e.target.value,
    });
  };
  handleMaxMarks = (e) => {
    this.setState({
      maxMarks: e.target.value,
    });
  };
  handleLanguage = (e) => {
    this.setState({
      language: e.target.value,
    });
  };
  handleClick = () => {
    this.props.toggle();
  };
  render() {
    const { inProgress, error } = this.props.auth;
    const { code } = this.props.createClassroom;
    return (
        <div>
        <Button variant="contained" sx={{ mt: 3, mb: 2 }} fullWidth onClick={this.dialogOpen} >
          Create New Lab Link
        </Button>
        <Dialog open={this.state.open} onClose={this.dialogClose}>
        <DialogTitle>
        Create New Lab
            {error && <div className="alert error-dailog">{error}</div>}
            {code && (
              <div className="alert success-dailog">
                <p>Lab Created Successfully!!</p>
              </div>
            )}
        </DialogTitle>
        <DialogContent>
            <TextField
                autoFocus
                margin="normal"
                type="text"
                placeholder="Description"
                required
                onChange={this.handleDescription}
                fullWidth
                variant="standard"
            />
            <TextField
                autoFocus
                margin="normal"
                type="text"
                placeholder="Question"
                onChange={this.handleQuestion}
                fullWidth
                variant="standard"
            />
            <TextField
                autoFocus
                margin="normal"
                type="text"
                placeholder="Custom Input"
                onChange={this.handleInput}
                fullWidth
                variant="standard"
            />
            <TextField
                autoFocus
                margin="normal"
                type="text"
                placeholder="Custom Output"
                onChange={this.handleOutput}
                fullWidth
                variant="standard"
            />
            <TextField
                autoFocus
                margin="normal"
                type="text"
                placeholder="Maximum Marks"
                onChange={this.handleMaxMarks}
                fullWidth
                variant="standard"
            />
            <TextField
                autoFocus
                margin="normal"
                type="text"
                placeholder="Language"
                onChange={this.handleLanguage}
                fullWidth
                variant="standard"
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={this.handleSubmitForm} disabled={inProgress}>
            Create Lab
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
export default connect(mapStateToProps)(CreateLabDialog);
