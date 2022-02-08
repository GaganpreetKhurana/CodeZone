import React from "react";
import { connect } from "react-redux";
import AddAnnouncement from "./AddAnnouncement";

//Material UI
import Card from "@mui/material/Card";
import { FlexRow, Item } from "@mui-treasury/component-flex";
import CardContent from "@mui/material/CardContent";
import { Paper, Button } from "@mui/material";
import Typography from "@mui/material/Typography";

class QuizBoard extends React.Component {
  render() {
    const { auth } = this.props;

    return (
      <div>
        <Paper>
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
                  <b>Quiz</b>
                </Typography>
              </Item>
            </FlexRow>
            <CardContent>
              <Button>Join Quiz</Button>
              <Button>Quiz Results</Button>
              {auth.user.role === "Teacher" && (
                <Button>Create Quiz</Button>
              )}
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
    darkModetheme: state.theme,
    classroom: state.classroom,
  };
}
export default connect(mapStateToProps)(QuizBoard);
