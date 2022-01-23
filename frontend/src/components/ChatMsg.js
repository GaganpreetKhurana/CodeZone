import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

import withStyles from "@material-ui/core/styles/withStyles";
import defaultChatMsgStyles from "./ChatDefault";

const ChatMsg = withStyles(defaultChatMsgStyles, { name: "ChatMsg" })(
  (props) => {
    const {
      messages,
      side,
    } = props;
    return (
      <Grid
        container
        spacing={2}
        justifyContent={side === "right" ? "flex-end" : "flex-start"}
      >
        <Grid item xs={8}>
          {messages.map((msg, i) => {
            return (
              // eslint-disable-next-line react/no-array-index-key
              <div key={msg.id || i} >
                <Typography
                  align={"left"}>
                  {msg}
                </Typography>
              </div>
            );
          })}
        </Grid>
      </Grid>
    );
  }
);

ChatMsg.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.string),
  side: PropTypes.oneOf(["left", "right"]),
};
ChatMsg.defaultProps = {
  messages: [],
  side: "left",
};

export default ChatMsg;
