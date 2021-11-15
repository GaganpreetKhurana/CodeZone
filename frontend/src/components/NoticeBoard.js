import React from "react";
import { connect } from "react-redux";

class NoticeBoard extends React.Component {
  render() {
    return <div className="notice-board"></div>;
  }
}
function mapStateToProps(state) {
    return {
      auth: state.auth,
      darkModetheme: state.theme
    };
  }
export default connect(mapStateToProps)(NoticeBoard);
