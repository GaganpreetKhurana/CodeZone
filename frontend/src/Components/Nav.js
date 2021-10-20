import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../actions/auth";
import CreateClassPopUp from "./CreateClassPopUp";
import JoinClassPopUp from "./JoinClassPopUp";

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

  render() {
    const { auth } = this.props;
    console.log(auth);
    return (
      <div>
        {/*Navbar */}
        <nav className="nav">
          <div className="left-div">
            {/*on clicking the logo it will take to the homepage */}
            <Link to="/">
              <span className="main-logo">CODEZONE</span>
            </Link>
          </div>
          {auth.isLoggedIn &&
            auth.user.role === "Teacher" && (<div>
            <button onClick={this.toggleJoinButton}>Join</button>
            <button onClick={this.toggleCreateButton}>Create</button> </div>)}
          {auth.isLoggedIn && auth.user.role === "Student" && (
            <button onClick={this.toggleJoinButton}>Join</button>
          )}
          {this.state.create ? (
            <CreateClassPopUp toggle={this.toggleCreateButton} />
          ) : null}
          {this.state.join ? (
            <JoinClassPopUp toggle={this.toggleJoinButton} />
          ) : null}
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
  };
}

export default connect(mapStateToProps)(Nav);
