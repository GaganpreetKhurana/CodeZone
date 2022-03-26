import { Component } from "react";
import { connect } from "react-redux";
import {fetchQuiz,submitQuiz} from "../actions/quiz";

// Material UI
import { Grid } from "@mui/material";
import Color from "color"; // v3.2.1
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const CardActionAreaActionArea = styled(CardActionArea)(() => ({
  borderRadius: 10,
  transition: "0.2s",
  "&:hover": {
    transform: "scale(1.09)",
  },
}));

const StyledCard = styled(Card)(({ color }) => ({
  minWidth: "30vh",
  minHeigth: "30vh",
  maxWidth: "30vh",
  maxHeigth: "30vh",
  borderRadius: 16,
  boxShadow: "none",
  "&:hover": {
    boxShadow: `0 6px 12px 0 ${Color(color).rotate(-12).darken(0.2).fade(0.5)}`,
  },
}));

const StyledCard2 = styled(Card)(({ color }) => ({
  minWidth: "100hh",
  minHeigth: "60vh",
  maxWidth: "100hh",
  maxHeigth: "60vh",
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

const TypographySubtitle = styled(Typography)(() => ({
  fontFamily: "Montserrat",
  color: "#fff",
  opacity: 0.87,
  fontWeight: 500,
  fontSize: 18,
}));

const CustomCard = ({ color, title }) => (
  <CardActionAreaActionArea>
    <StyledCard color={color}>
      <CardContentContent color={color} disableSpacing>
        <TypographySubtitle variant={"h2"}>{title}</TypographySubtitle>
      </CardContentContent>
    </StyledCard>
  </CardActionAreaActionArea>
);

const CustomCard2 = ({ color, title, subtitle }) => (
  <StyledCard2 color={color}>
    <CardContentContent color={color} disableSpacing>
      <TypographyTitle variant={"h2"}>{title}</TypographyTitle>
      <TypographySubtitle variant={"h2"}>{subtitle}</TypographySubtitle>
    </CardContentContent>
  </StyledCard2>
);

class QuizStudent extends Component {
  constructor(props) {
    super(props);
    
    this.quizID = "623eb17550524d884712f9ae";
    this.props.dispatch(fetchQuiz(this.quizID));
    
    this.checkAnswer = this.checkAnswer.bind(this);
    console.log("WW$$#",this.state,this.props,"QQAAA");
    this.state = this.getInitialState();
  };
  
  
  sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  };
  getInitialState() {
    console.log(this.props,"OOO");
    let currentQuiz=this.props.quiz.quiz;
    if(!currentQuiz){
      console.log(this.props,this.state,"RR");
    }
    return {
      questionData: currentQuiz.questions,
      quizName: currentQuiz.title,
      quizDescription: currentQuiz.description,
      maxScore: currentQuiz.maxScoreQuiz,
      quizID: currentQuiz.quizID,
      progress: 0,
      score: 0,

      studentResponse: {
        finalScore: 0,
        response: {}
      }
    };
  }

  updateResponse = (index) => {
    console.log(this.state,"W");
    let currentQuestion=this.state.questionData[this.state.progress].questionNumber;
    // console.log(currentQuestion.toString());
    
    
    let studentResponse = this.state.studentResponse;
    studentResponse.response[currentQuestion]=index;
    studentResponse.finalScore = this.state.score;
    this.setState({ studentResponse });
    console.log(studentResponse)
  }

  checkAnswer(index) {
    var correct = this.state.questionData[this.state.progress].correct;
    var newScore = 0,
    newProgress = 0;
    if (correct === index) {
      newScore =
        parseInt(this.state.score) +
        parseInt(this.state.questionData[this.state.progress].questionMarks);
      this.setState({ score: newScore });
      newProgress = this.state.progress + 1;
      this.setState({ progress: newProgress });
    } else {
      newProgress = this.state.progress + 1;
      this.setState({ progress: newProgress });
    }
    this.updateResponse(index);
  }
  
  submit(){
    let submission = {
      quiz : this.state.quizID,
      answers : this.state.studentResponse.response,
    }
    console.log(submission.answers,"EE");
    this.props.dispatch(submitQuiz(submission));
    
  }
  render() {
    var currentQuestion = this.state.questionData[this.state.progress];
    if (this.state.questionData.length > this.state.progress) {
      return (
        <div>
          <div>
            <Grid height="100vh" m={10}>
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
                {this.state.quizName}
                {this.state.quizDescription}
                <Grid
                  item
                  container
                  direction="row"
                  justifyContent="space-evenly"
                  alignItems="center"
                >
                  <Grid item m={2} sx={2}>
                    {" "}
                    <CustomCard2
                      title={currentQuestion.question}
                      color="#5879ad"
                    />
                  </Grid>
                  <Grid
                    container
                    sx={2}
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Grid item m={2} sx={2} onClick={() => this.checkAnswer(0)}>
                      <CustomCard
                        title={currentQuestion.answers[0]}
                        color="#253145"
                      />
                    </Grid>
                    <Grid item m={2} sx={2} onClick={() => this.checkAnswer(1)}>
                      <CustomCard
                        title={currentQuestion.answers[1]}
                        color="#253145"
                      />
                    </Grid>
                    <Grid
                      container
                      sx={12}
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Grid
                        item
                        m={2}
                        sx={2}
                        onClick={() => this.checkAnswer(2)}
                      >
                        <CustomCard
                          title={currentQuestion.answers[2]}
                          color="#253145"
                        />
                      </Grid>
                      <Grid
                        item
                        m={2}
                        sx={2}
                        onClick={() => this.checkAnswer(3)}
                      >
                        <CustomCard
                          title={currentQuestion.answers[3]}
                          color="#253145"
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  item
                  m={2}
                  container
                  justifyContent="space-evenly"
                  alignItems="center"
                >
                  <span>
                    Question {this.state.progress + 1} of{" "}
                    {this.state.questionData.length}
                  </span>
                </Grid>
              </Card>
            </Grid>
          </div>
        </div>
      );
    } else {
      this.submit();
      return (
        <div>
          <Grid container direction="column" height="100vh">
            <Grid item m={15} container justifyContent="center"></Grid>
            <Grid item container justifyContent="center" alignItems="center">
              <CustomCard2 title={"Quiz Finished!"} color="#253145" />
            </Grid>
          </Grid>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    quiz: state.quiz,
  };
}

export default connect(mapStateToProps)(QuizStudent);
