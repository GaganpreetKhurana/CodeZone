import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../actions/auth";
import { switchTheme } from "../actions/theme";
import logo from "../static/logo.png";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Button, Grid } from "@mui/material";
import JoinClassDialog from "./JoinClassDialog";
import CreateClassDialog from "./CreateClassDialog";
import ModeNightIcon from "@mui/icons-material/ModeNight";
import { Paper } from "@mui/material";
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
      <Paper elevation={7}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" style={{ background: "#0053A7" }}>
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <Link to="/">
                  <img src={logo} alt="logo" width="150" height="50" />
                </Link>
              </Typography>
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
              {auth.isLoggedIn && auth.user.role === "Student" && (
                <JoinClassDialog />
              )}
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
              <Button onClick={this.switchTheme}>
                {" "}
                <ModeNightIcon />{" "}
              </Button>
            </Toolbar>
          </AppBar>
        </Box>
      </Paper>
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
