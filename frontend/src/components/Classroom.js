import React, { Component } from "react";
import { connect } from "react-redux";
import DiscussionPortal from "./DiscussionPortal";
import StudentsList from "./StudentsList";
import NoticeBoard from "./NoticeBoard";
import ChatWindow from "./ChatWindow";

//Material UI
import { Grid} from '@mui/material';
import { fetchClassroomDetails, clearClassroomDetails } from "../actions/classroom";


class Classroom extends Component {
  componentDidMount() {
    const { match } = this.props;

    if (match.params.classroomID) {
      this.timer = setInterval(() => {
      this.props.dispatch(fetchClassroomDetails(match.params.classroomID));
    }, 5000);
    }
  }

  componentDidUpdate(prevProps) {
    const {
      match: { params: prevParams },
    } = prevProps;
    const {
      match: { params: currentParams },
    } = this.props;
    if (prevParams && currentParams && currentParams !== prevParams) {
      //fetch new classroom  details
    }
  }
  componentWillUnmount() {
    clearInterval(this.timer);
    this.props.dispatch(clearClassroomDetails());
  }
  render() {
    const { match } = this.props;
    // return <div>{match.params.classroomID}</div>;
    return (
      <Grid 
        spacing={2}
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
      >
        <StudentsList />
        <DiscussionPortal/>
        <NoticeBoard classroomId={match.params.classroomID}/>  
        <ChatWindow/>
      </Grid>
    )
  }
}
function mapStateToProps(state) {
  return {
    auth: state.auth,
    createClassroom: state.createClassroom,
  };
}
export default connect(mapStateToProps)(Classroom);

