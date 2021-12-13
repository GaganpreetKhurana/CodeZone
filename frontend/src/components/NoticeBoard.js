import React from "react";
import { connect } from "react-redux";
import CreateLabDialog from "./CreateLabDialog";
import JoinLabDialog from "./JoinLabDialog";
import ShareLink from "./ShareLink";

//Material UI
import { Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Paper, Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const Div = styled("div")(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(2),
  textAlign: "center",
}));

class NoticeBoard extends React.Component {
  render() {
    const { auth,classroomId } = this.props;
    const {ClassMeetLink} = this.props.classroom;

    return (
      <Grid item m={2} xs={3}>
        <Paper elevation={4}>
          <Card sx={{ minWidth: 0 }}>
            <Div>Announcements</Div>
            <CardContent>
              {/* List or checkboxes ? */}
              <span className="row"> Assignment - 2 
              Deadline 22-11-2021 11:59PM</span>

              {auth.user.role === "Teacher" && (
                <ShareLink classroom_id={classroomId}/>
              )}
              <a href={ClassMeetLink} target="_blank">
              <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={!ClassMeetLink}>
                Online Class Link
              </Button>
              </a>
              {auth.user.role === "Teacher" && <CreateLabDialog  classroomId={classroomId} />}
              <JoinLabDialog classroomId={classroomId} />
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
export default connect(mapStateToProps)(NoticeBoard);
