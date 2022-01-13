import React, { Component } from "react";
import { connect } from "react-redux";
import { deletePost, clearMsg} from "../actions/posts";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
class DeletePostPopUp extends Component {

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

  handleSubmitForm = (e) => {
    e.preventDefault();
    const { id } = this.props;
    if (id) {
    this.props.dispatch(deletePost(id));
    this.props.dispatch(clearMsg());
    }
  };

  render() {
    const { error } = this.props.posts;
    return (
    <div>
    <IconButton><DeleteIcon fontSize="small"  variant="contained" onClick={this.dialogOpen}/></IconButton>
      <Dialog open={this.state.open}>
        <DialogTitle>
            {error && <div className="alert error-dailog">{error}</div>}
            {/* {success && (
              <div className="alert success-dailog">
                <p>Post Deleted successfully!!</p>
              </div>
            )} */}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
                Are you sure you want to delete this Post!!!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={this.handleSubmitForm} >
                Delete
            </Button>
            <Button onClick={this.dialogClose} >
                Close
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
export default connect(mapStateToProps)(DeletePostPopUp);

