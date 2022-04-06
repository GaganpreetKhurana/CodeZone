import React, { Component } from "react";
import { connect } from "react-redux";
import {fetchClassQuizResult} from "../../actions/quiz";
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

  componentWillMount() {
    //fetch quiz results
    const {quizID} = this.props;
    this.props.dispatch(fetchClassQuizResult(quizID));
  }

  render() {
    let {quizResult} = this.props.quiz;
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
                    <TableCell align="center">SID</TableCell>
                    <TableCell align="center">Student</TableCell>
                    <TableCell align="center">Marks Obtained</TableCell>
                    <TableCell align="center">View Response</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {quizResult.students && quizResult.students.map((student) => (
                  <TableRow
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell align="center">{student.studentSID}</TableCell>
                    <TableCell align="center">{student.studentName}</TableCell>
                    <TableCell align="center">{student.score}</TableCell>
                    <TableCell align="center">
                      <ViewResponse submissionID={student.submissionID} />
                    </TableCell>
                  </TableRow>
                  ))}
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
    quiz:state.quiz,
  };
}
export default connect(mapStateToProps)(ViewQuizResult);
