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
      this.props.dispatch(updateMeetLink(content,classroom_id));
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
            Share Class Link
        </Button>
      <Dialog open={this.state.open} >
        <DialogTitle>
        {error && <div className="alert error-dailog">{error}</div>}
            {success && (
              <div className="alert success-dailog">
                <p>Updated successfully!!</p>
              </div>
            )}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
                Add Link to be Shared
          </DialogContentText>
        </DialogContent>
        <DialogActions>
            <TextField
                autoFocus
                margin="dense"
                type="text"
                placeholder={"Add Link"}
                required
                onChange={this.handleCode}
                fullWidth
                variant="standard"
            />
            <Button onClick={this.handleSubmitForm}>
                Share
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

