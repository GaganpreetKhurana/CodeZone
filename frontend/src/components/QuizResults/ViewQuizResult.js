import React, { Component } from "react";
import { connect } from "react-redux";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

class ViewQuizResult extends Component {
  state = {
    dialogOpen: true,
  };

  dialogOpen = () => {
    this.setState({ open: true });
  };

  dialogClose = () => {
    this.setState({ open: false });
  };

  componentDidMount() {
    //fetch quiz results
  }

  render() {
    return (
      <div>
        <Button fullWidth sx={{ mt: 1, mb: 1 }} onClick={this.dialogOpen}>
          View Quiz Result
        </Button>
        <Dialog fullScreen open={this.state.open} onClose={this.dialogClose}>
          <DialogTitle>Class Quiz Result</DialogTitle>
          <DialogActions>
            <TableContainer>
              <Table sx={{ minWidth: "75%" }}>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Student</TableCell>
                    <TableCell align="center">Maximum Marks</TableCell>
                    <TableCell align="center">Marks Obtained</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell align="center">Student</TableCell>
                    <TableCell align="center">Maximum Marks</TableCell>
                    <TableCell align="center">Marks Obtained</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <Button onClick={this.dialogClose}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}
export default connect(mapStateToProps)(ViewQuizResult);
