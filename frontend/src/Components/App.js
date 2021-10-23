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
import { Paper,Button} from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { red, yellow } from '@mui/material/colors';
import {ThemeProvider} from '@mui/material';


// @ts-ignore
//to decode the token
import jwt_decode from "jwt-decode";
import { authenticateUser } from "../actions/auth";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class App extends React.Component {

  state = {darkMode: true};

  componentDidMount() {
    //check if token already present else wwe would place it
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwt_decode(token);
      this.props.dispatch(
        authenticateUser({
          email: user.email,
          _id: user._id,
          name: user.name,
          role: user.role,
          SID: user.SID,
        })
      );
    }   
  }

  render() {
    const { darkMode } = this.state;
    const theme = createTheme({
      palette: {
          mode: darkMode ? "dark" : "light",
          primary: red,
          secondary: yellow
      },
    });
    const { auth } = this.props;
    //elselogin or signup page or 404 page or main homepage of app would be added
    return (
      <ThemeProvider theme={theme}>
        <Paper>
          <Router>
            <Nav darkModehandler={this.themeSwitcher}/>
            <h1>hELLO</h1>
            <Button checked ={darkMode} onClick = {() => this.setState({darkMode: !darkMode}) } >Theme Switcher</Button>
            <Switch>
              {auth.isLoggedIn && auth.user.role === "Student" && (
                <Route exact path="/" component={StudentDashboard} />
              )}
              {auth.isLoggedIn && auth.user.role === "Teacher" && (
                <Route exact path="/" component={TeacherDashboard} />
              )}
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={SignUp} />
              <Route path="/classroom/:classroomID" component={Classroom}/>
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
  };
}

export default connect(mapStateToProps)(App);
