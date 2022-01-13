import React from "react";
import { connect } from "react-redux";
import ChatWindow from "./ChatWindow";

//Material UI
import { Grid } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Paper } from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";

const Div = styled("div")(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(2),
  textAlign: "center",
}));

class StudentsList extends React.Component {
  render() {
    let { user } = this.props.auth;
    let { students, teachers } = this.props.classroom;
    return (
      <Grid item m={2} xs={3}>
        <Paper elevation={4}>
          <Card sx={{ minWidth: 0 }}>
            <Div>Enrolled List</Div>
            <CardContent>
              {/* iterate over teachers and then  students list here */}
              <List sx={{ width: "100%", maxWidth: 360 }}>
                {teachers.map((value) => (
                  <ListItem
                    key={value._id}
                    secondaryAction={
                      <ChatWindow self={user} other={value}></ChatWindow>
                    }
                  >
                    <ListItemButton>
                      <ListItemAvatar>
                        <Avatar>
                          <AccountCircleIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={value.name} />
                    </ListItemButton>
                    <Divider />
                  </ListItem>
                ))}
                {students.map((value) => (
                  <ListItem
                    key={value._id}
                    secondaryAction={
                      <ChatWindow self={user} other={value}></ChatWindow>
                    }
                  >
                    <ListItemButton>
                      <ListItemAvatar>
                        <Avatar>
                          <AccountCircleIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={`${value.name}-${value.SID}`} />
                    </ListItemButton>
                    <Divider />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Paper>
      </Grid>
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
