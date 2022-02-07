import { Component } from "react";
import { connect } from "react-redux";

// Material UI

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
          answer: ["Argentina", "Thailand", "India", "United Kingdom"],
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
          <p>{currentQuestion.question}</p>
          <ul>
            {currentQuestion.answers.map(function (answer, index) {
              return (
                <div>
                  <li onClick={() => this.checkAnswer(index)}>{answer}</li>
                </div>
              );
            }, this)}
          </ul>
          
          <span>Score: {this.state.score}</span>
          <span>
            Question {this.state.progress + 1} of{" "}
            {this.state.questionData.length}
          </span>
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
