import React from "react";
import { connect } from "react-redux";
import ChatWindow from "./ChatWindow";

//Material UI
import { FlexRow, FlexCol, Item } from "@mui-treasury/component-flex";
import Avatar from "@mui/material/Avatar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import { Paper } from "@mui/material";

const PersonItem = ({
  src = "",
  name = "",
  count = 0,
  self = {},
  other = {},
}) => {
  return (
    <FlexRow gap={12} p={2} noWrap>
      <Item noShrink>
        <Avatar>
          <AccountCircleIcon />
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
          <ChatWindow self={self} other={other}></ChatWindow>
        </Item>
      </FlexRow>
    </FlexRow>
  );
};

class StudentsList extends React.Component {
  render() {
    let { user } = this.props.auth;
    let { students, teachers } = this.props.classroom;
    return (
      <div>
        <Paper elevation={4}>
          <FlexCol
            borderRadius={2}
            sx={{
              bgcolor: (theme) =>
                theme.palette.mode === "dark"
                  ? "#1f2733"
                  : "rgb(244, 247, 250)",
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
                <PersonItem name={value.name} self={user} other={value} />
                <Divider />
              </div>
            ))}
            {students.map((value) => (
              <div>
                <PersonItem
                  name={value.name}
                  count={value.SID}
                  self={user}
                  other={value}
                />
                <Divider />
              </div>
            ))}
          </FlexCol>
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
