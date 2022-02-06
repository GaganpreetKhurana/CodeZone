import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";

export default function ChatMsg(props) {
  const sideBool = props.side === "left" ? true : false;
  const message = props.messages;
  const sender = props.name;
  const avatar = props?.avatar;
  return (
    <div>
      {sideBool ? (
        <div>
          <ListItem>
            <ListItemAvatar>
              <Avatar alt={sender} src={avatar} />
            </ListItemAvatar>
            <ListItemText primary={message} />
          </ListItem>
        </div>
      ) : (
        <div>
          <ListItem>
            <ListItemText primary={message} />
            <ListItemAvatar>
              <Avatar alt={sender} src={avatar} />
            </ListItemAvatar>
          </ListItem>
        </div>
      )}
    </div>
  );
}
