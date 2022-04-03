import React, { Component } from "react";
import { connect } from "react-redux";
import { updateMeetLink, clearMsg} from "../actions/posts";

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
class ShareLinkPopUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
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
    this.props.dispatch(clearMsg());
  };

  //to clear the error if it comes on reload or whenever the user shifts from this page
  componentWillUnmount() {
    this.props.dispatch(clearMsg());
  }
  handleSubmitForm = (e) => {
    e.preventDefault();
    const { content } = this.state;
    const {classroom_id} = this.props;
    if (content && classroom_id) {
      let classLink = `http://localhost:3000/room/${content}`
      console.log(classLink);
      this.props.dispatch(updateMeetLink(classLink,classroom_id));
    }
  };

  handleCode = (e) => {
    this.setState({
      content: e.target.value,
    });
  };

  render() {
    const { error,success } = this.props.posts;
    return (
    <div>
        <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={this.dialogOpen}>
            Create New Class Link
        </Button>
      <Dialog open={this.state.open} >
        <DialogTitle>
        {error && <div className="alert error-dailog">{error}</div>}
            {success && (
              <div className="alert success-dailog">
                <p>Class Link Shared successfully!!</p>
              </div>
            )}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
                Add Class Description
          </DialogContentText>
        </DialogContent>
        <DialogActions>
            <TextField
                autoFocus
                margin="dense"
                type="text"
                placeholder={"Add Class Description"}
                required
                onChange={this.handleCode}
                fullWidth
                variant="standard"
            />
            <Button onClick={this.handleSubmitForm}>
                Create
            </Button>
            <Button onClick={this.dialogClose}>
                Cancel
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
    posts: state.posts,
  };
}
export default connect(mapStateToProps)(ShareLinkPopUp);

