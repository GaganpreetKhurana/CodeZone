import React from "react";
import { connect } from "react-redux";
import Home from "./Home";
import { home } from "../actions/home";
import axios from "axios";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class App extends React.Component {
  componentDidMount() {
    //check if token already present else wwe would place it
    const token = localStorage.getItem("token");
    const url = "/api";
    fetch(url)
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
    // axios.get(url).then((response) => console.log(response));

    console.log("function called");
  }

render() {
    const { auth } = this.props;
    return (
      <Router>
        <Route exact path="/" component={Home} />
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(App);
