import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";


export default function ChatMsg(props) {
  //const side = props.side;
  const sideBool = props.side === "left" ? true : false;
  const message = props.messages;
  const sender = props.name;
  return (
    <div>
      {sideBool ? (
        <div>
          <ListItem>
            <ListItemAvatar>
              <Avatar alt={sender} />
            </ListItemAvatar>
            <ListItemText primary={message} />
          </ListItem>
        </div>
      ) : (
        <div>
          <ListItem>
            <ListItemText primary={message} />
            <ListItemAvatar>
              <Avatar alt={sender} />
            </ListItemAvatar>
          </ListItem>
        </div>
      )}
    </div>
  );
}
