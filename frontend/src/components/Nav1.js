import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../actions/auth";
import { switchTheme } from "../actions/theme";
import logo from "../static/logo.png";

//Material ui
import { Button, Grid } from "@mui/material";
import JoinClassDialog from "./JoinClassDialog";
import CreateClassDialog from "./CreateClassDialog";
import ModeNightIcon from "@mui/icons-material/ModeNight";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";

class Nav extends React.Component {
  state = {
    create: false,
    join: false,
  };
  logout = () => {
    localStorage.removeItem("token");
    this.props.dispatch(logoutUser());
  };
  toggleCreateButton = () => {
    this.setState({
      create: !this.state.create,
    });
  };
  toggleJoinButton = () => {
    this.setState({
      join: !this.state.join,
    });
  };
  switchTheme = () => {
    this.props.dispatch(switchTheme());
  };

  render() {
    const { auth } = this.props;

    return (
      <div>
        {/*Navbar */}
        <Box display="flex" p={2} alignItems="center" bgcolor="#404042">
          <Box textAlign="right">
            <Link to="/">
              <img src={logo} alt="logo" width="250px" height="auto" />
            </Link>
          </Box>
          <Box flexGrow={6} textAlign="center">
            {auth.isLoggedIn && auth.user.role === "Teacher" && (
              <div>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-evenly"
                  alignItems="center"
                >
                  <JoinClassDialog />
                  <CreateClassDialog />
                </Grid>
              </div>
            )}
            {auth.isLoggedIn && auth.user.role === "Student" && (
              <JoinClassDialog />
            )}
          </Box>
          <Box flexGrow={0.5} textAlign="right">
            {auth.isLoggedIn && (
              <div>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-evenly"
                  alignItems="center"
                >
                  <Link to="/settings">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSH4dcYWVFHFsz8M3Rsjpy2Hg6gQAmgbCIwWA&usqp=CAU"
                      alt="user-dp"
                      id="user-dp"
                      width="30px"
                    />
                  </Link>
                  {auth.user.name}
                </Grid>
              </div>
            )}
          </Box>
          <Box flexGrow={0} textAlign="right">
            <div>
              {!auth.isLoggedIn && (
                <Button>
                  <Link to="/login">
                    <Typography color="common.white">Login</Typography>
                  </Link>
                </Button>
              )}
              {auth.isLoggedIn && (
                <Button onClick={this.logout}>
                  <Typography color="common.white">Logout</Typography>
                </Button>
              )}
              {!auth.isLoggedIn && (
                <Button>
                  <Link to="/signup">
                    <Typography color="common.white">Register</Typography>
                  </Link>
                </Button>
              )}
            </div>
          </Box>
          <Box flexGrow={0} textAlign="right">
            <Button onClick={this.switchTheme}>
              <ModeNightIcon />
            </Button>
          </Box>
        </Box>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    darkModetheme: state.theme,
  };
}

export default connect(mapStateToProps)(Nav);
