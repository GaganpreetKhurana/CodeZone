import React from "react";
import {connect} from "react-redux";
import io from "socket.io-client";
import Picker from 'emoji-picker-react';


// import EmbedVideo from "./EmbedVideo";
import FileBase64 from "react-file-base64";

import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
// eslint-disable-next-line
import {clearEarlierMessages, getEarlierMessages} from "../actions/classroom";

import ChatMsg from "./ChatMsg";
//Material UI
import CommentIcon from "@mui/icons-material/Comment";
import IconButton from "@mui/material/IconButton";
import {Paper} from "@mui/material";
import Divider from "@mui/material/Divider";
import InputBase from "@mui/material/InputBase";
import { Grid } from "@material-ui/core";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

class ChatBox extends React.Component {
  constructor(props) {
    super(props);
    this.titleRef = React.createRef();
    this.state = {
      contentMessage: "",
      messages: [],
      fileType: false,
      files: "",
    };
    this.emojiPickerShow = false;
  }

  handleSmoothScroll = () => {
    this.titleRef.current.scrollIntoView({ behavior: "smooth" });
    // this.socket.emit("ReadAll", this.props.self_details.id);
  };

  componentDidMount() {
    if (
      this.props.self_details.id &&
      this.props.other_details._id &&
      this.props.classroomId
    ) {
      let roomCode =
        this.props.self_details.id > this.props.other_details._id
          ? this.props.classroomId +
            "--" +
            this.props.other_details._id +
            "--" +
            this.props.self_details.id
          : this.props.classroomId +
            "--" +
            this.props.self_details.id +
            "--" +
            this.props.other_details._id;
      this.props.dispatch(getEarlierMessages(roomCode));
    }
    this.timer = setTimeout(() => {
      this.setState({
        messages: this.props.classroom.messageArray,
      });
    }, 1000);
    this.setUpConnections();
    this.interval = setInterval(() => {
      // console.log("ReadAll",this.props.self_details.id,this.socket);
      this.socket.emit("ReadAll", this.props.self_details.id);
    }, 1500);
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
        console.log(data);
        this.handleSmoothScroll();
      });
    }
    this.socket = socket;
  };

  componentWillUnmount() {
    this.socket.disconnect();
    this.props.dispatch(clearEarlierMessages());
    clearInterval(this.interval);
    // console.log("Cleared Interval")
  }

	sendMessage = (e) => {
    e.preventDefault();
    let olderMessages = this.state.messages;
    let newMessage = {
      content: this.state.fileType
        ? this.state.contentMessage.base64
        : this.state.contentMessage,
      sender: this.props.self_details.id,
      fileType: this.state.fileType,
      time: Date.now(),
    };

    this.socket.emit(
      "SendChat",
      this.props.self_details.id,
      newMessage.content,
      this.state.fileType
    );
    this.setState({
	  contentMessage: "",
	  fileType: false,
      messages: [...olderMessages, newMessage],
    });
  };

  handleChangeMessage = (e) => {
    this.setState({
      contentMessage: e.target.value,
    });
  };
  onEmojiClick = (event, emojiObject) => {
    this.setState({
      contentMessage: this.state.contentMessage + emojiObject.emoji,
    });
    console.log(this.state.contentMessage);
  };
  handleEmojiPicker = (e) => {
    this.emojiPickerShow = !this.emojiPickerShow;
  };
  handleFileChange = () => {
    this.setState({
      fileType: !this.state.fileType,
    });
  };
  getFiles = (files) => {
    this.setState({ contentMessage: files });
  };
  render() {
    const { self_details, other_details } = this.props;
    const { messages } = this.state;
    return (
      <div>
        <Grid container direction="column">
            {messages.length > 0 &&
              messages.map((message) => (
                <div key={message}>
                  <ChatMsg
                    name={message.sender}
                    side={message.sender === self_details.id ? "right" : "left"}
                    avatar={
                      message.sender === self_details.id
                        ? self_details?.avatar
                        : other_details?.avatar
                    }
                    messages={message.content}
                    fileIsImage={message.file}
                  />
                </div>
              ))}
        </Grid>
        {this.emojiPickerShow && (
          <Picker
            pickerStyle={{ width: "100%", aspectRatio: "0.2" }}
            onEmojiClick={this.onEmojiClick}
          />
        )}
        <Paper
          component="form"
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Start typing a comment"
            inputProps={{ "aria-label": "search google maps" }}
            value={this.state.contentMessage}
            onChange={this.handleChangeMessage}
            ref={this.titleRef}
          />
          {this.state.fileType && (
            <FileBase64 multiple={false} onDone={this.getFiles.bind(this)} />
          )}
          <FormGroup>
            <FormControlLabel
              control={<Checkbox />}
              label="Image"
              onChange={this.handleFileChange}
            />
          </FormGroup>
          <InsertEmoticonIcon
            onClick={this.handleEmojiPicker}
            color="primary"
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
      </div>
    );
  }
}

function mapStateToProps(state){
	return {
		auth: state.auth,
		classroom: state.classroom,
		darkModetheme: state.theme,
	};
}

export default connect(mapStateToProps)(ChatBox);
