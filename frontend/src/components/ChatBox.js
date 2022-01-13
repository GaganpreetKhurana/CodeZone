import React from "react";
import { connect } from "react-redux";
import io from "socket.io-client";
import { getEarlierMessages, clearEarlierMessages, updateMessages } from "../actions/classroom";


//Material UI
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import CommentIcon from "@mui/icons-material/Comment";
import IconButton from "@mui/material/IconButton";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Paper } from "@mui/material";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import InputBase from "@mui/material/InputBase";

const Div = styled("div")(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(2),
  textAlign: "center",
}));

class ChatBox extends React.Component {
  
  constructor(props) {
    super(props);
    this.titleRef = React.createRef();
    this.state = {
      contentMessage: "",
      messages: [],
    };
  }
  handleSmoothScroll = () => {
    this.titleRef.current.scrollIntoView({ behavior: 'smooth' });
}
  componentDidMount() {
    
      if(this.props.self_details.id && this.props.other_details._id && this.props.classroomId){
        let roomCode = this.props.self_details.id > this.props.other_details._id ? this.props.classroomId + "--" + this.props.other_details._id + "--" + this.props.self_details.id :  this.props.classroomId + "--" + this.props.self_details.id + "--" +  this.props.other_details._id;
        this.props.dispatch(getEarlierMessages(roomCode)); 
      }
      this.timer = setTimeout(() => {
        this.setState({
          messages: this.props.classroom.messageArray,
        })
        this.handleSmoothScroll();
      }, 1000);
    this.setUpConnections();
  }
  setUpConnections = () => {
    if (
      this.props.self_details.id &&
      this.props.other_details._id &&
      this.props.classroomId
    ) {
      var socket = io("http://localhost:3002", {
        query: {
          sender_id: this.props.self_details.id,
          receiver_id: this.props.other_details._id,
          classroomId: this.props.classroomId,
        },
      });
      socket.on("ReceiveChat", (data) => {
        this.setState({
          messages: data,
        });
        this.handleSmoothScroll();
      });
    }
    this.socket = socket;
  };

  componentWillUnmount() {
    this.socket.disconnect();
    this.props.dispatch(clearEarlierMessages());
  }
  sendMessage = (e) => {
    e.preventDefault();
    let olderMessages = this.state.messages;
    let newMessage = {
      content: this.state.contentMessage,
      sender: this.props.self_details.id,
      time: Date.now(),
    };
    
    this.socket.emit(
      "SendChat",
      this.props.self_details.id,
      this.state.contentMessage
    );
    this.setState({
      contentMessage: "",
      messages: [...olderMessages, newMessage],
    });
    this.handleSmoothScroll();
  };
  
  handleChangeMessage = (e) => {
    this.setState({
      contentMessage: e.target.value,
    });
  };

  render() {
    const { self_details, other_details } = this.props;
    const { messages } = this.state;
    return (
      <div>
        <Paper elevation={4}>
          <Card sx={{ minWidth: 0 }}>
            {<Div>{`${other_details.name} - ${other_details.SID} `}</Div>}
            <CardContent>
            
              <List sx={{ width: "100%" }}>
                {messages.length > 0 &&
                  messages.map((message) => (
                    <ListItem key={message.time} alignItems="flex-start">
                      {message.sender == self_details.id ? (
                        <></>
                      ) : (
                        <ListItemAvatar>
                          <Avatar alt="Student 2" src="" />
                        </ListItemAvatar>
                      )}
                      <ListItemText
                        primary={
                          message.sender == self_details.id
                            ? "You"
                            : other_details.name
                        }
                        secondary={
                          <React.Fragment>{message.content}</React.Fragment>
                        }
                      />
                      {message.sender == self_details.id ? (
                        <ListItemAvatar>
                          <Avatar alt="Student 3" src="" />
                        </ListItemAvatar>
                      ) : (
                        <></>
                      )}
                    </ListItem>
                  ))}
              </List>
              
              <Paper
                component="form"
                sx={{
                  p: "2px 4px",
                  display: "flex",
                  alignItems: "center",
                  width: 300,
                }}
              >
                < InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Start typing a comment"
                  inputProps={{ "aria-label": "search google maps" }}
                  value={this.state.contentMessage}
                  onChange={this.handleChangeMessage}
                  ref={this.titleRef}
                />
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <IconButton
                  color="primary"
                  sx={{ p: "10px" }}
                  aria-label="directions"
                  onClick={this.sendMessage}
                >
                  <CommentIcon />
                </IconButton>
              </Paper>
            </CardContent>
          </Card>
        </Paper>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    classroom: state.classroom,
    darkModetheme: state.theme,
  };
}

export default connect(mapStateToProps)(ChatBox);
