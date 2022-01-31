import React, { Component } from "react";
import { connect } from "react-redux";
import { updatePost, clearMsg} from "../actions/posts";

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
class EditPostPopUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: this.props.content,
      file: this.props.files,
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
    const {id} = this.props;
    if (content && id) {
      this.props.dispatch(updatePost(content,id));
    }
  };

  handleCode = (e) => {
    this.setState({
      content: e.target.value,
    });
  };

  render() {
    const { error,success } = this.props.posts;
    const { content } = this.props;
    return (
    <div>
    <IconButton><EditIcon fontSize="small"  variant="contained" onClick={this.dialogOpen}/></IconButton>
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
                Update Post
          </DialogContentText>
        </DialogContent>
        <DialogActions>
            <TextField
                autoFocus
                margin="dense"
                type="text"
                placeholder={content}
                required
                onChange={this.handleCode}
                fullWidth
                variant="standard"
            />
            <Button onClick={this.handleSubmitForm}>
                Update
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
export default connect(mapStateToProps)(EditPostPopUp);

