import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";


export default function ChatMsg(props) {
  const side = props.side;
  const message = props.messages;
  const sender = props.name;
  return (
    <ListItem
      align = {side === "right" ? "flex-end" : "flex-start"}
      justifyContent={side === "right" ? "flex-end" : "flex-start"}
      style={{ flex: 1 }}
    >
      <ListItemAvatar>
        <Avatar alt={sender} />
      </ListItemAvatar>
      <ListItemText primary={message} />
    </ListItem>
  );
}
