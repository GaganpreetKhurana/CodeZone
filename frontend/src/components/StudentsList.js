import React from "react";
import { connect } from "react-redux";
import ChatWindow from "./ChatWindow";
import { fetchUnreadMessageCount } from "../actions/classroom";

//Material UI
import { FlexRow, Item } from "@mui-treasury/component-flex";
import Avatar from "@mui/material/Avatar";
// eslint-disable-next-line
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { Paper } from "@mui/material";
import Card from "@mui/material/Card";

const PersonItem = ({
  src = "",
  avatar = "",
  name = "",
  count = 0,
  self = {},
  other = {},
  classroomId = {},
  messageArray={},
    unreadMessageCount=0,
}) => {
  return (
    <FlexRow gap={12} p={2} noWrap>
      <Item noShrink>
        <Avatar src={avatar}>
        </Avatar>
      </Item>
      <FlexRow gap={2} p={0.25} grow stackPoint={240} alignItems="center">
        <Item grow>
          <Typography
            noWrap
            sx={{
              fontWeight: 600,
              fontSize: "1rem",
              color: (theme) =>
                theme.palette.mode === "dark" ? "#fff" : "#122740",
            }}
          >
            <b>{name}</b>
              <b>  Unread: </b> {unreadMessageCount}
          </Typography>
          <Typography
            noWrap
            variant="body2"
            sx={{
              fontSize: "0.875rem",
              color: "#758392",
              mt: -0.25,
            }}
          >
            {count}
          </Typography>
        </Item>
        <Item>
          <ChatWindow self={self} other={other} classroomId = {classroomId} messageArray={messageArray}></ChatWindow>
        </Item>
      </FlexRow>
    </FlexRow>
  );
};

class StudentsList extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchUnreadMessageCount(this.props.classroomId));
        this.timer = setInterval(() => {
            this.props.dispatch(fetchUnreadMessageCount(this.props.classroomId));
            // console.log(this.props.classroom.unreadMessageCount);
            // console.log(this.state);
        }, 5000);

    }
    componentWillUnmount () {
        // console.log(this.timer);
        clearInterval(this.timer);
    }
    
    render() {
    let {user} = this.props.auth;
    let {students, teachers,messageArray,unreadMessageCount} = this.props.classroom;
    const {classroomId} = this.props;
    return (
      <div>
        <Paper elevation={4} style={{ maxHeight: 300, overflow: "auto" }}>
          <Card
            sx={{
              minWidth: 0,
              bgcolor: (theme) =>
                theme.palette.mode === "dark" ? "#272727" : "#fff",
              boxShadow: (theme) =>
                theme.palette.mode === "dark"
                  ? "unset"
                  : "0 8px 16px 0 #BDC9D7",
            }}
          >
            <FlexRow
              alignItems="center"
              p={2}
              sx={{
                bgcolor: (theme) =>
                  theme.palette.mode === "dark" ? "#2f3c50" : "#fff",
              }}
            >
              <Item grow mr={1}>
                <Typography variant="h6" align="center">
                  <b>Student List</b>
                </Typography>
              </Item>
            </FlexRow>
            {teachers.map((value) => (
              <div>
                <PersonItem
                  name={value.name}
                  self={user}
                  other={value}
                  classroomId={classroomId}
                  messageArray={messageArray}
                  unreadMessageCount={unreadMessageCount[value._id]}
                />
                <Divider />
              </div>
            ))}
            {students.map((value) => (
              <div>
                <PersonItem
                  name={value.name}
                  avatar = {value?.avatar}
                  count={value.SID}
                  self={user}
                  other={value}
                  classroomId={classroomId}
                  messageArray={messageArray}
                  unreadMessageCount={unreadMessageCount[value._id]}
                />
                <Divider />

              </div>
            ))}
          </Card>
        </Paper>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    darkModetheme: state.theme,
    classroom: state.classroom,
  };
}
export default connect(mapStateToProps)(StudentsList);
