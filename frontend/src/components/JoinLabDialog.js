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
  }

  componentWillUnmount() {
      //clear lab details
    this.props.dispatch(clearLabDetails());
    this.props.dispatch(clearAuth());
  }
  
  render() {
    const { user } =this.props.auth;
    const { labDetails } = this.props.labDetails;
    console.log("labDetails",labDetails);
    return (
    <div>
    <Button  fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={this.dialogOpen}>
        Join Lab
    </Button>
      <Dialog open={this.state.open} onClose={this.dialogClose}>
        {labDetails.length === 0 && <DialogTitle>No Existing Lab For this class yet!!</DialogTitle>}
        {labDetails.length !== 0 && <DialogTitle>Existing Lab Details</DialogTitle>}
        <DialogActions>
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
                  {labDetails.map((row) => (
                    <TableRow
                      key={row._id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row" align="center">{row.description}</TableCell>
                      <TableCell align="center">{row.createdAt.slice(0, 10)}</TableCell>
                      <TableCell align="center">{row.maxMarks ==="" ? '-' : row.maxMarks}</TableCell>
                      <TableCell align="center">
                        <Link to={`/code-editor/${user._id}/${row._id}`} onClick={()=>{
                          //fetch this code-editor's details using row_id
                          this.props.dispatch(createNewCodeEditor(user._id,row._id));
                        }}>
                          Link  
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
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