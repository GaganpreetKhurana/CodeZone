import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { clearAuth } from "../actions/auth";
import { clearLabDetails ,fetchClassLabDetails, createNewCodeEditor } from "../actions/classroom";

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

class JoinLabDialog extends Component {
  state = {
      dialogOpen:true
  }

  dialogOpen = () => {
    this.setState({ open: true });
  };

  dialogClose = () => {
    this.setState({ open: false });
  };

  //to clear the error if it comes on reload or whenever the user shifts from this page
  componentDidMount() {
    //fetch lab details for this classsroom 
    const { classroomId} = this.props;
    this.props.dispatch(fetchClassLabDetails(classroomId));
    this.timer = setInterval(() => {
      this.props.dispatch(fetchClassLabDetails(classroomId));
    }, 1000);
  }

  componentWillUnmount() {
    //clear lab details
    clearInterval(this.timer);
    this.props.dispatch(clearLabDetails());
    this.props.dispatch(clearAuth());
  }
  
  render() {
    const { user } =this.props.auth;
    const { labDetails } = this.props.labDetails;
    const { classroomId} = this.props;
    return (
    <div>
    <Button  fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={this.dialogOpen}>
        Join Lab
    </Button>
      <Dialog open={this.state.open} onClose={this.dialogClose}>
        {labDetails.length === 0 && <DialogTitle>No Existing Lab For this class yet!!</DialogTitle>}
        {labDetails.length !== 0 && <DialogTitle>Existing Lab Details</DialogTitle>}
        <DialogActions>
        {labDetails.length !== 0 && 
            <TableContainer>
              <Table sx={{ minWidth: 450 }}>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Description</TableCell>
                    <TableCell align="center">Created On</TableCell>
                    <TableCell align="center">Marks</TableCell>
                    <TableCell align="center">Link to Join</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                {user.role==="Teacher" && labDetails.map((row) => (
                    <TableRow
                      key={row._id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row" align="center">{row.description}</TableCell>
                      <TableCell align="center">{row.createdAt.slice(0, 10)}</TableCell>
                      <TableCell align="center">{row.maxMarks ==="" ? '-' : row.maxMarks}</TableCell>
                      <TableCell align="center">
                      {user.id && <Link to={`/labDetails/${classroomId}/${user.id}/${row._id}`} onClick={()=>{
                          //fetch this code-editor's details using row_id
                           this.props.dispatch(createNewCodeEditor(user.id,row._id));
                        }}>
                          View
                        </Link>
                        }
                      </TableCell>
                    </TableRow>
                  ))}
                  {user.role==="Student" && labDetails.map((row) => (
                    <TableRow
                      key={row._id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row" align="center">{row.description}</TableCell>
                      <TableCell align="center">{row.createdAt.slice(0, 10)}</TableCell>
                      <TableCell align="center">{row.maxMarks ==="" ? '-' : row.maxMarks}</TableCell>
                      <TableCell align="center">
                      {user.id && <Link to={`/code-editor/${user.id}/${row._id}`} onClick={()=>{
                          //fetch this code-editor's details using row_id
                          this.props.dispatch(createNewCodeEditor(user.id,row._id));
                        }}>
                          Link  
                        </Link>
                        }
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
  }
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
    createClassroom: state.createClassroom,
    labDetails: state.labDetails,
  };
}
export default connect(mapStateToProps)(JoinLabDialog);