import React from "react";
import { connect } from "react-redux";
import Page404 from "./Page404";
import Nav from "./Nav";
import Login from "./Login";
import SignUp from "./SignUp";
import Home from "./Home";
import TeacherDashboard from "./TeacherDashboard";
import StudentDashboard from "./StudentDashboard";
import Classroom from "./Classroom";
import LabDashboard from "./LabDashboard";
import Settings from "./Settings";
import QuizStudent from "./QuizStudent";
import QuizCreate from "./QuizCreate";
import { Paper} from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { deepOrange } from '@mui/material/colors';
import {ThemeProvider,CssBaseline} from '@mui/material';
import CodeEditorScreen from "./CodeEditorScreen";
import App2 from "./Video_Conferencing/App2";
import GradeResult from './QuizResults/GradeResults';

// @ts-ignore
//to decode the token
import jwt_decode from "jwt-decode";
import { authenticateUser } from "../actions/auth";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class App extends React.Component {

  componentDidMount() {
    fetch('/api/video/access_token', {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      }
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.success) {
          if(data?.token){
            localStorage.setItem("video_token", data?.token);
          }
        }
      });

    const token = localStorage.getItem("token");
    if(token){
    const user = jwt_decode(token);
    if (user) {
      this.props.dispatch(
        authenticateUser({
          email: user.email,
          id: user._id,
          name: user.name,
          role: user.role,
          SID: user.SID,
          avatar: '',
        })
      );
      const url = `/api/users/fetchUserDetails/${user._id}`;
      fetch(url, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        }
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            this.props.dispatch(
              authenticateUser({
                email: data.data.user.email,
                id: data.data.user.id,
                name: data.data.user.name,
                role: data.data.user.role,
                SID: data.data.user.SID,
                avatar: data.data.user.avatar,
              })
            );
            return;
          }
          else{
            this.props.dispatch(
              authenticateUser({
                email: user.email,
                id: user._id,
                name: user.name,
                role: user.role,
                SID: user.SID,
                avatar: '',
              })
            );
          }
        });
      
    } 
    }  
  }

  render() {
    const { darkModetheme } = this.props;
    const theme = createTheme({
      palette: {
        mode: darkModetheme.darkMode ? "dark" : "light",
        primary: {
          main: "#3F51B5",
        },
        secondary: deepOrange,
      },
    });
    const { auth } = this.props;
    //elselogin or signup page or 404 page or main homepage of app would be added
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Paper>
          <Router>
            <Nav />
            <Switch>
              {auth.isLoggedIn && auth.user.role === "Student" && (
                <Route exact path="/" component={StudentDashboard} />
              )}
              {auth.isLoggedIn && auth.user.role === "Teacher" && (
                <Route exact path="/" component={TeacherDashboard} />
              )}
              {auth.isLoggedIn && (
                <Route path="/classroom/:classroomID" component={Classroom} />
              )}
              {auth.isLoggedIn && (
                <Route path="/room/:roomID" component={App2} />
              )}
              {auth.isLoggedIn && (
                <Route
                  path="/code-editor/:userId/:labId"
                  component={CodeEditorScreen}
                />
              )}
              {auth.isLoggedIn && auth.user.role === "Teacher" && (
                <Route
                  path="/labDetails/:classroomId/:userId/:labId"
                  component={LabDashboard}
                />
              )}
              {auth.isLoggedIn && (
                <Route path="/settings" component={Settings} />
              )}
              {auth.isLoggedIn && auth.user.role === "Student" && (
                <Route path="/quiz" component={QuizStudent} />
              )}
              {auth.isLoggedIn && auth.user.role === "Teacher" && (
                <Route path="/quizCreate" component={QuizCreate} />
              )}
              {auth.isLoggedIn && auth.user.role === "Student" && (
                <Route path="/QuizStudent/:quiz_id" component={QuizStudent} />
              )}
              <Route exact path="/" component={Home} />
              <Route path="/CodeZone" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={SignUp} />
              <Route path="/CodeEditorScreen" component={CodeEditorScreen} />
              {!auth.isLoggedIn && (
                <Route path="/classroom/:classroomID" component={Home} />
              )}
              {auth.isLoggedIn && auth.user.role === "Teacher" && (
                <Route
                  path="/grading"
                  component={GradeResult}
                />
              )}
              <Route component={Page404} />
            </Switch>
          </Router>
        </Paper>
      </ThemeProvider>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    darkModetheme: state.theme
  };
}

export default connect(mapStateToProps)(App);
