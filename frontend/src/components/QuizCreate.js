import React from "react";
import { connect } from "react-redux";

//Material UI
import { Grid, Box ,Card,Button } from "@mui/material";
import TextField from "@mui/material/TextField";

class QuizCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quizName: "",
      quizDescription: "",
      maxScore: 0,
      questionData: [],
      question: "",
      answers: [],
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      correct: null,
      type: "mcq",
    };
  }

  handleChange(event, key) {
    this.setState({ [key]: event.target.value });
  }

  handleQuestions = () => {
    let optionData = [...this.state.answers];
    optionData.push(this.state.option1)
    optionData.push(this.state.option2);
    optionData.push(this.state.option3);
    optionData.push(this.state.option4);

    const newData = {
      question: this.state.question,
      correct: this.state.correct,
      answers: optionData,
      type: "mcq",
    };
    let questionData = [...this.state.questionData];
    questionData.push(newData);
    this.setState({ questionData });
    this.setState({
      question: "",
      answers: [],
      correct: null,
      type: "mcq",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
    });
    console.log(this.state)
  };

  render() {
    return (
      <div>
        <Grid height="100vh">
          <Box
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <Card
              sx={{
                minWidth: "100vh",
                minHeight: "70vh",
                bgcolor: (theme) =>
                  theme.palette.mode === "dark" ? "#272727" : "#fff",
                boxShadow: (theme) =>
                  theme.palette.mode === "dark"
                    ? "unset"
                    : "0 8px 16px 0 #BDC9D7",
              }}
            >
              <Grid container justifyContent="space-evenly" alignItems="center">
                <Grid item xs={8} sm={8} md={8}>
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
                <Grid item xs={8} sm={8} md={8}>
                  {" "}
                  <TextField
                    id="question"
                    label="Question"
                    variant="filled"
                    fullWidth="True"
                    type="text"
                    value={this.state.question}
                    onChange={(event) => this.handleChange(event, "question")}
                  />
                  <TextField
                    id="correct"
                    label="correct"
                    variant="filled"
                    fullWidth="True"
                    type="number"
                    value={this.state.correct}
                    onChange={(event) => this.handleChange(event, "correct")}
                  />
                  <Grid item xs={12} sm={12} md={12}>
                    <TextField
                      id="option1"
                      label="Option One"
                      variant="filled"
                      type="text"
                      value={this.state.option1}
                      onChange={(event) => this.handleChange(event, "option1")}
                    />
                    <TextField
                      id="option2"
                      label="Option Two"
                      variant="filled"
                      type="text"
                      value={this.state.option2}
                      onChange={(event) => this.handleChange(event, "option2")}
                    />
                    <TextField
                      id="option3"
                      label="Option Three"
                      variant="filled"
                      type="text"
                      value={this.state.option3}
                      onChange={(event) => this.handleChange(event, "option3")}
                    />
                    <TextField
                      id="option4"
                      label="Option Four"
                      variant="filled"
                      type="text"
                      value={this.state.option4}
                      onChange={(event) => this.handleChange(event, "option4")}
                    />
                  </Grid>
                  <Button onClick={this.handleQuestions}>Submit</Button>
                </Grid>
              </Grid>
            </Card>
          </Box>
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
