import React, { Component } from "react";
import { connect } from "react-redux";
import { clearAuth } from "../actions/auth";
import { createClassroom } from "../actions/createClassroom";

class CreateClassPopUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subject: "",
      batch: "",
      description: "",
    };
  }
  //to clear the error if it comes on reload or whenever the user shifts from this page
  componentWillUnmount() {
    this.props.dispatch(clearAuth());
  }

  handleSubmitForm = (e) => {
    e.preventDefault();
    const { subject, batch, description } = this.state;
    if (subject && batch) {
      this.props.dispatch(createClassroom(subject, batch, description));
    }
  };
  handleBatch = (e) => {
    this.setState({
      batch: e.target.value,
    });
  };
  handleSubject = (e) => {
    this.setState({
      subject: e.target.value,
    });
  };
  handleDescription = (e) => {
    this.setState({
      description: e.target.value,
    });
  };
  handleClick = () => {
    this.props.toggle();
  };
  render() {
    return (
      <div className="popup-box">
        <div className="box">
          <span className="close-icon" onClick={this.handleClick}>
            x
          </span>
          {/* create new classroom form visible only to teachers */}
          <form className="login-form">
            <span className="login-signup-header">Create Classroom</span>
            {error && <div className="alert error-dailog">{error}</div>}
            <div className="field">
              <input
                type="text"
                placeholder="Subject"
                required
                onChange={this.handleSubject}
              />
            </div>
            <div className="field">
              <input
                type="text"
                placeholder="Batch"
                required
                onChange={this.handleBatch}
              />
            </div>
            <div className="field">
              <input
                type="text"
                placeholder="Brief Description"
                onChange={this.handleDescription}
              />
            </div>
            <div className="field">
              <button onClick={this.handleSubmitForm} disabled={inProgress}>
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}
export default connect(mapStateToProps)(CreateClassPopUp);
