import React, { Component } from "react";
import { connect } from "react-redux";
import ViewResponse from "./ViewResponse";
import { fetchQuizResult } from "../../actions/quiz";


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

  componentWillMount() {
    //fetch quiz results
    const { classroomId} = this.props;
    this.props.dispatch(fetchQuizResult(classroomId));
    this.timer = setInterval(() => {
      this.props.dispatch(fetchQuizResult(classroomId));
    }, 10000);
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { quizResult } = this.props.quiz;
    
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
                    <TableCell align="center">Scheduled Date</TableCell>
                    <TableCell align="center">Scheduled Time</TableCell>
                    <TableCell align="center">Score</TableCell>
                    <TableCell align="center">View Response</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {quizResult && quizResult.map((row) => (
                  <TableRow
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell align="center">{row.quizName}</TableCell>
                    <TableCell align="center">{row.quizDescription}</TableCell>
                    <TableCell align="center">{row.dateScheduled.slice(0,10)}</TableCell>
                    <TableCell align="center">{row.dateScheduled.slice(11,-5)}</TableCell>
                    <TableCell align="center">{row.score}</TableCell>
                    <TableCell align="center">
                      <ViewResponse submissionID={row.submissionID} />
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
    quiz: state.quiz,
  };
}
export default connect(mapStateToProps)(QuizResultStudent);
