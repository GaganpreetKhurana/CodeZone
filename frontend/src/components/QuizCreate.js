import React from "react";
import { connect } from "react-redux";

import {quizCreate} from "../actions/quiz";

//Material UI
import { Grid, Box, Card, Button, Paper } from "@mui/material";
import TextField from "@mui/material/TextField";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Snackbar } from "@mui/material";
import { Alert } from "@mui/material";


class QuizCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quizName: "",
      quizDescription: "",
      maxScore: 0,
      questionData: [],
      questions: [],
      question: "",
      answers: [],
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      questionNumber: 0,
      questionMarks: 0,
      correct: null,
      type: "mcq",
      quizDuration: 0,
      dateScheduled: "2022-05-31T10:30",
      alert: "False"
    };
  }

  handleChange(event, key) {
    this.setState({ [key]: event.target.value });
  }

  handleQuestions = () => {
    let optionData = [...this.state.answers];
    optionData.push(this.state.option1);
    optionData.push(this.state.option2);
    optionData.push(this.state.option3);
    optionData.push(this.state.option4);

    const newData = {
      question: this.state.question,
      correct: this.state.correct,
      answers: optionData,
      type: "mcq",
      questionMarks: this.state.questionMarks,
      questionNumber : this.state.questionNumber 
    };

    let questionData = [...this.state.questionData];
    questionData.push(newData);
    this.setState({ questionData });
    let marks = this.state.questionMarks; 
    this.setState(
      {
        question: "",
        answers: [],
        correct: 0,
        type: "mcq",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        questionMarks: 0,
        questionNumber: this.state.questionNumber + 1,
        maxScore: parseInt(this.state.maxScore) + parseInt(marks),
      },
    ); 
    console.log(this.state.questionData);
  };

  handleSubmit = () => {
    const submitQuizData = {
      quizName: this.state.quizName,
      quizDescription: this.state.quizDescription,
      questionData: this.state.questionData,
      maxScore: this.state.maxScore,
      quizDuration: this.state.quizDuration * 60,
      dateScheduled: new Date (new Date(this.state.dateScheduled) -  19800000 + (2 *  19800000)),
    };
    // console.log(submitQuizData,"RR");
    // console.log(this.state,this.props);
    let classroom_id = this.props.classroom.ID;
    this.props.dispatch(quizCreate(submitQuizData.quizName, submitQuizData.quizDescription, submitQuizData.questionData, submitQuizData.maxScore, classroom_id, submitQuizData.quizDuration, submitQuizData.dateScheduled));
    this.setState({ alert: "True" },);
    setTimeout(() => {
      this.setState({ alert: "False" });
    }, 3000);
  }

  render() {
    return (
      <div>
        <Grid height="100vh" m={4} spacing={5}>
          <Card
            sx={{
              bgcolor: (theme) =>
                theme.palette.mode === "dark" ? "#272727" : "#fff",
              boxShadow: (theme) =>
                theme.palette.mode === "dark"
                  ? "unset"
                  : "0 8px 16px 0 #BDC9D7",
            }}
          >
            <Grid container justifyContent="space-evenly" alignItems="center">
              <Grid item m={2} xs={12} sm={12}>
                {" "}
                <TextField
                  id="quizName"
                  label="Quiz Name"
                  variant="filled"
                  fullWidth="True"
                  value={this.state.quizName}
                  type="text"
                  onChange={(event) => this.handleChange(event, "quizName")}
                />
              </Grid>
              <Grid item m={2} xs={12} sm={12}>
                {" "}
                <TextField
                  id="quizDescription"
                  label="Quiz Description"
                  variant="filled"
                  fullWidth="True"
                  value={this.state.quizDescription}
                  type="text"
                  onChange={(event) =>
                    this.handleChange(event, "quizDescription")
                  }
                />
              </Grid>
              <Grid item m={2} xs={12} sm={12}>
                {" "}
                <TextField
                  id="quizDuration"
                  label="Quiz Duration in (Minutes)"
                  variant="filled"
                  fullWidth="True"
                  value={this.state.quizDuration}
                  type="text"
                  onChange={(event) => this.handleChange(event, "quizDuration")}
                />
              </Grid>
              <Grid item m={2} xs={12} sm={12}>
                <TextField
                  id="datetime-local"
                  label="Test Duration"
                  variant="filled"
                  fullWidth="True"
                  value={this.state.dateScheduled}
                  type="datetime-local"
                  onChange={(event) =>
                    this.handleChange(event, "dateScheduled")
                  }
                  defaultValue="2022-05-31T10:30"
                />
              </Grid>
              <Grid item m={2} xs={12} sm={12}>
                <Paper>
                  <Grid item m={2} xs={12} sm={12}>
                    {" "}
                    <TextField
                      id="question"
                      label="Question"
                      variant="filled"
                      fullWidth="True"
                      type="text"
                      value={this.state.question}
                      onChange={(event) => this.handleChange(event, "question")}
                    />{" "}
                  </Grid>
                  <Grid item m={2} xs={12}>
                    <Grid
                      container
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                      spacing={3}
                    >
                      <Grid item xs={12} sm={6}>
                        <TextField
                          id="option1"
                          label="Option One"
                          fullWidth="True"
                          variant="filled"
                          type="text"
                          value={this.state.option1}
                          onChange={(event) =>
                            this.handleChange(event, "option1")
                          }
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          id="option2"
                          label="Option Two"
                          fullWidth="True"
                          variant="filled"
                          type="text"
                          value={this.state.option2}
                          onChange={(event) =>
                            this.handleChange(event, "option2")
                          }
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          id="option3"
                          label="Option Three"
                          fullWidth="True"
                          variant="filled"
                          type="text"
                          value={this.state.option3}
                          onChange={(event) =>
                            this.handleChange(event, "option3")
                          }
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          id="option4"
                          label="Option Four"
                          variant="filled"
                          fullWidth="True"
                          type="text"
                          value={this.state.option4}
                          onChange={(event) =>
                            this.handleChange(event, "option4")
                          }
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item m={2} xs={12} sm={12}>
                    <TextField
                      id="correct"
                      label="Correct Option"
                      variant="filled"
                      fullWidth="True"
                      type="number"
                      value={this.state.correct}
                      onChange={(event) => this.handleChange(event, "correct")}
                    />
                  </Grid>
                  <Grid item m={2} xs={12} sm={12}>
                    <TextField
                      id="questionMarks"
                      label="Marks"
                      variant="filled"
                      fullWidth="True"
                      type="number"
                      value={this.state.questionMarks}
                      onChange={(event) =>
                        this.handleChange(event, "questionMarks")
                      }
                    />
                  </Grid>
                </Paper>
              </Grid>
              <Box sx={{ justifyContent: "space-between" }}>
                <Button onClick={this.handleQuestions}>Add Question</Button>
                <Button onClick={this.handleSubmit}>Submit the quiz</Button>
              </Box>
            </Grid>
          </Card>
          <Paper m={4}>
            <Card
              m={4}
              sx={{
                bgcolor: (theme) =>
                  theme.palette.mode === "dark" ? "#272727" : "#fff",
                boxShadow: (theme) =>
                  theme.palette.mode === "dark"
                    ? "unset"
                    : "0 8px 16px 0 #BDC9D7",
              }}
            >
              <TableContainer>
                <Table sx={{ minWidth: "75%" }}>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Question No</TableCell>
                      <TableCell align="center">Question</TableCell>
                      <TableCell align="center">Correct Option</TableCell>
                      <TableCell align="center">Option 1</TableCell>
                      <TableCell align="center">Option 2</TableCell>
                      <TableCell align="center">Option 3</TableCell>
                      <TableCell align="center">Option 4</TableCell>
                      <TableCell align="center">Marks</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.questionData.map((question) => (
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="center">
                          {question.questionNumber}
                        </TableCell>
                        <TableCell align="center">
                          {question.question}
                        </TableCell>
                        <TableCell align="center">{question.correct}</TableCell>
                        <TableCell align="center">
                          {question.answers[0]}
                        </TableCell>
                        <TableCell align="center">
                          {question.answers[1]}
                        </TableCell>
                        <TableCell align="center">
                          {question.answers[2]}
                        </TableCell>
                        <TableCell align="center">
                          {question.answers[3]}
                        </TableCell>
                        <TableCell align="center">
                          {question.questionMarks}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
            {this.state.alert === "True" && (
              <Snackbar open={true} autoHideDuration={2000}>
                <Alert severity="success" sx={{ width: "100%" }}>
                  "Quiz Submitted"
                </Alert>
              </Snackbar>
            )}
          </Paper>
        </Grid>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    auth: state.auth,
    classroom: state.classroom,
  };
}
export default connect(mapStateToProps)(QuizCreate);
