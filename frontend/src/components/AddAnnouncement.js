import React, { Component } from "react";
import { connect } from "react-redux";
import { addAnnouncement, clearMsg, deleteAnnouncement} from "../actions/posts";

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
class AddAnnouncement extends Component {
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
      this.props.dispatch(addAnnouncement(content,classroom_id));
    }
  };

  handleCode = (e) => {
    this.setState({
      content: e.target.value,
    });
  };

  render() {
    const { error,success } = this.props.posts;
    const {announcements} = this.props.classroom;
    return (
    <div>
        <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={this.dialogOpen}>
            Update Announcements
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
          {announcements.length === 0 && <>No Announcements to display</>}
          {announcements.length !== 0 && <>Previous Announcements</>}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        {announcements.length !== 0 && 
            <TableContainer>
              <Table sx={{ maxHeight: 200, overflow: "auto"}}>
                <TableBody>
                  {announcements.map((row) => (
                    <TableRow
                      key={row._id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row" align="center">{row.content}</TableCell>
                      <TableCell align="center">
                      {row._id && <button  onClick={()=>{
                          console.log("delete");
                          //fetch this code-editor's details using row_id
                          this.props.dispatch(deleteAnnouncement(row._id));
                        }}>
                          Delete 
                        </button>
                        }
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
  }
  </DialogActions>
  <DialogActions>
            <TextField
                autoFocus
                margin="normal"
                type="text"
                placeholder={"Add new Announcement"}
                required
                onChange={this.handleCode}
                fullWidth
                variant="standard"
            />
            <Button onClick={this.handleSubmitForm}>
                Add
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
    classroom: state.classroom,
  };
}
export default connect(mapStateToProps)(AddAnnouncement);

