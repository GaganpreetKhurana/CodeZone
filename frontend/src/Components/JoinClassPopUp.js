import React, { Component } from "react";
import { connect } from "react-redux";
import { clearAuth } from "../actions/auth";
import { joinClassroom, clearClassCode} from "../actions/createClassroom";

class JoinClassPopUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: "",
    };
  }
  //to clear the error if it comes on reload or whenever the user shifts from this page
  componentWillUnmount() {
    this.props.dispatch(clearAuth());
  }
  handleSubmitForm = (e) => {
    e.preventDefault();
    const { code } = this.state;
    if (code) {
      this.props.dispatch(joinClassroom(code));
    }
  };
  handleClick = () => {
    this.props.toggle();
    this.props.dispatch(clearClassCode());
  };
  handleCode = (e) => {
    this.setState({
      code: e.target.value,
    });
  };
  render() {
    const { inProgress, error } = this.props.auth;
    const { code } = this.props.createClassroom;
    return (
      <div className="popup-box">
        <div className="box">
            <span className="close-icon" onClick={this.handleClick}>x</span>
            <form className="login-form">
            <span className="login-signup-header">Create Classroom</span>
            {error && <div className="alert error-dailog">{error}</div>}
            {code && (
              <div className="alert success-dailog">
                <p>Classroom joined successfully!!</p>
              </div>
            )}
            <div className="field">
              <input
                type="text"
                placeholder="Enter ClassRoom Code"
                required
                onChange={this.handleCode}
              />
            </div>
            <div className="field">
              <button onClick={this.handleSubmitForm} disabled={inProgress}>
                Join Classroom
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
    createClassroom: state.createClassroom,
  };
}
export default connect(mapStateToProps)(JoinClassPopUp);

