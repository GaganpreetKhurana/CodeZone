import React from "react";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import { Grid } from "@mui/material";

export default function ChatMsg(props) {
  const sideBool = props.side === "left" ? true : false;
  const message = props.messages;
  const sender = props.name;
  const avatar = props?.avatar;
  //const fileIsImage = props.fileIsImage;
  return (
    <Grid item m={5}>
      {sideBool ? (
        <Grid container direction="row" justifyContent="flex-end">
          <Grid item xs={10}>
            <Avatar alt={sender} src={avatar} />
          </Grid>
          <Grid item xs={2}>
            {message.startsWith("data:image") ? (
              <div>
                <img alt="" src={message} width="30" height="30" />
              </div>
            ) : (
              <div>
                <ListItemText primary={message} />
              </div>
            )}
          </Grid>
        </Grid>
      ) : (
        <Grid container direction="row" justifyContent="flex-end">
          <Grid item xs={10}>
            {message.startsWith("data:image") ? (
              <div>
                <img alt="" src={message} width="30" height="30" />
              </div>
            ) : (
              <div>
                <ListItemText primary={message} />
              </div>
            )}
          </Grid>
          <Grid item xs={2}>
            <Avatar alt={sender} src={avatar} />
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}
