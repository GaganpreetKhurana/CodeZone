import { Component } from "react";
import { connect } from "react-redux";

// Material UI
import { Paper } from "@mui/material";
import { Grid } from "@mui/material";
import Color from "color"; // v3.2.1
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useTheme } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const CardActionAreaActionArea = styled(CardActionArea)(() => ({
  borderRadius: 10,
  transition: "0.2s",
  "&:hover": {
    transform: "scale(1.09)",
  },
}));

const StyledCard = styled(Card)(({ color }) => ({
  minWidth: 256,
  minHeigth: 256,
  maxWidth: 256,
  maxHeigth: 256,
  borderRadius: 16,
  boxShadow: "none",
  "&:hover": {
    boxShadow: `0 6px 12px 0 ${Color(color).rotate(-12).darken(0.2).fade(0.5)}`,
  },
}));

const CardContentContent = styled(CardContent)(({ color }) => {
  return {
    backgroundColor: color,
    padding: "1rem 1.5rem 1.5rem",
  };
});

const TypographyTitle = styled(Typography)(() => ({
  fontFamily: "Keania One",
  fontSize: "2rem",
  color: "#fff",
  textTransform: "uppercase",
}));

const CustomCard = ({ color, title }) => (
  <CardActionAreaActionArea>
    <StyledCard color={color}>
      <CardContentContent color={color} disableSpacing>
        <TypographyTitle variant={"h2"}>{title}</TypographyTitle>
      </CardContentContent>
    </StyledCard>
  </CardActionAreaActionArea>
);

class QuizStudent extends Component {
  constructor(props) {
    super(props);

    this.state = this.getInitialState();
    this.checkAnswer = this.checkAnswer.bind(this);
    this.resetQuiz = this.resetQuiz.bind(this);
  }

  getInitialState() {
    return {
      questionData: [
        {
          question: "This is the capital of which country? Delhi",
          answers: ["India", "Australia", "Cuba", "Algeria"],
          correct: 0,
          type: "mcq",
        },
        {
          question: "This is the capital of which country? Bangkok",
          answers: ["Argentina", "Thailand", "India", "United Kingdom"],
          correct: 1,
          type: "mcq",
        },
      ],
      progress: 0,
      score: 0,
    };
  }

  checkAnswer(index) {
    var correct = this.state.questionData[this.state.progress].correct;
    var newScore = 0,
      newProgress = 0;
    if (correct === index) {
      newScore = this.state.score + 1;
      this.setState({ score: newScore });
      newProgress = this.state.progress + 1;
      this.setState({ progress: newProgress });
    } else {
      newProgress = this.state.progress + 1;
      this.setState({ progress: newProgress });
    }
  }

  resetQuiz() {
    this.setState({ score: 0, progress: 0 });
  }

  render() {
    var currentQuestion = this.state.questionData[this.state.progress];
    if (this.state.questionData.length > this.state.progress) {
      return (
        <div>
          <Grid container direction="column" height="100vh">
            <Grid
              item
              container
              justifyContent="space-evenly"
              alignItems="center"
            >
              <p>{currentQuestion.question}</p>
              <ul>
                {currentQuestion.answers.map((answer, index) => (
                  <div>
                    <Grid
                      item
                      m={4}
                      xs={12}
                      sm={4}
                      md={4}
                      onClick={() => this.checkAnswer(index)}
                    >
                      <CustomCard title={answer} color="#3F51B5"/>
                    </Grid>
                  </div>
                ))}
              </ul>
            </Grid>

            <span>
              Question {this.state.progress + 1} of{" "}
              {this.state.questionData.length}
            </span>
          </Grid>
        </div>
      );
    } else {
      return (
        <div>
          <p>Quiz Finished!</p>
          <span>Score: {this.state.score}</span>
          <button
            type="button"
            onClick={this.resetQuiz}
          >
            Reset Quiz
          </button>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(QuizStudent);
