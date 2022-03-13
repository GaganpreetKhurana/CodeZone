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
import Divider from '@mui/material/Divider';
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import FileBase64 from "react-file-base64";

class EditPostPopUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: this.props.content,
      file: this.props.files,
      files: "",
      fileUpload: false,
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
    const { content,files ,file} = this.state;
    const {id} = this.props;
    if ( (content || files) && id) {
        if (!content.length) {
          // eslint-disable-next-line
          this.state.content = "File Post";
        }
        let fileVal = files;
        
        if (fileVal === "") {
          // eslint-disable-next-line
          
          fileVal = "Empty";
          
        } else {
          fileVal = fileVal.base64;
        }
        this.props.dispatch(updatePost(content, id,fileVal));
        this.setState({
          content: "",
          files: "",
        });
        this.handleFileChange();
    }
  };
  
  getFiles = (files) => {
    this.setState({ files: files });
  };
  handleFileChange = () => {
    this.setState({
      fileUpload: !this.state.fileUpload,
    });
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
          {this.state.fileUpload && (
              <FileBase64 multiple={false} onDone={this.getFiles.bind(this)} />
          )}
          <FormGroup>
            <FormControlLabel
                control={<Checkbox />}
                label="Image"
                onChange={this.handleFileChange}
            />
          </FormGroup>
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          {this.state.files !== "" && (
              <img alt="" src={this.state.files.base64} width="50" height="50" />
          )}
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
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

