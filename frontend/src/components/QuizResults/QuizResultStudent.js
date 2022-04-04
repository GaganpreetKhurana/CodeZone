import React, { Component } from "react";
import { connect } from "react-redux";
import ViewResponse from "./ViewResponse";

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

class QuizResultStudent extends Component {
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
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={this.dialogOpen}
        >
          Quiz Results
        </Button>
        <Dialog open={this.state.open} onClose={this.dialogClose}>
          <DialogTitle>No Quiz Results For this class yet!!</DialogTitle>
          <DialogTitle>Quiz Results</DialogTitle>
          <DialogActions>
            <TableContainer>
              <Table sx={{ minWidth: "75%" }}>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Title</TableCell>
                    <TableCell align="center">Description</TableCell>
                    <TableCell align="center">Scheduled At</TableCell>
                    <TableCell align="center">Score</TableCell>
                    <TableCell align="center">View Response</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell align="center">Title</TableCell>
                    <TableCell align="center">Description</TableCell>
                    <TableCell align="center">Scheduled At</TableCell>
                    <TableCell align="center">Score</TableCell>
                    <TableCell align="center">
                      <ViewResponse />
                    </TableCell>
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
export default connect(mapStateToProps)(QuizResultStudent);
