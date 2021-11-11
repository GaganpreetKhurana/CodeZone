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
import ModeNightIcon from '@mui/icons-material/ModeNight';

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
        <nav className="nav">
          <div className="left-div">
            {/*on clicking the logo it will take to the homepage */}
            <Link to="/">
            <div className="logo"><img src={logo} alt="logo" width="45px" height="auto"  /></div>
              <span className="main-logo">
              CODEZONE</span>
            </Link>
          </div>
          {auth.isLoggedIn &&
            auth.user.role === "Teacher" && (<div>
            <Grid container direction="row" justifyContent="space-evenly" alignItems="center">
              <JoinClassDialog/>
              <CreateClassDialog/>
            </Grid>
             </div>
            )}
          {auth.isLoggedIn && auth.user.role === "Student" && (
            <JoinClassDialog/>
          )}
          <div className="right-nav">
            {auth.isLoggedIn && (
              <div className="user">
                <Link to="/settings">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSH4dcYWVFHFsz8M3Rsjpy2Hg6gQAmgbCIwWA&usqp=CAU"
                    alt="user-dp"
                    id="user-dp"
                  />
                </Link>
                <span>{auth.user.name}</span>
              </div>
            )}

            <div className="nav-links">
              <ul>
                {!auth.isLoggedIn && (
                  <li>
                    <Link to="/login">Log in</Link>
                  </li>
                )}
                {auth.isLoggedIn && <li onClick={this.logout}>Logout</li>}
                {!auth.isLoggedIn && (
                  <li>
                    <Link to="/signup">Register</Link>
                  </li>
                )}
                <Button  onClick={this.switchTheme}><ModeNightIcon/></Button>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    darkModetheme: state.theme
  };
}

export default connect(mapStateToProps)(Nav);
