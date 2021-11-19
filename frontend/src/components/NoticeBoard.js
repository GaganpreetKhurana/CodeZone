import React from "react";
import { connect } from "react-redux";
import CreateLabDialog from "./CreateLabDialog";

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

    return (
      <Grid item m={2} xs={3}>
        <Paper elevation={4}>
          <Card sx={{ minWidth: 0 }}>
            <Div>Announcements</Div>
            <CardContent>
              {/* List or checkboxes ? */}
              <span className="row"> Wohoo! No work due soon</span>

              {auth.user.role === "Teacher" && (
                <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                  Share Class Link
                </Button>
              )}
              <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Online Class Link
              </Button>
              {auth.user.role === "Teacher" && <CreateLabDialog  classroomId={classroomId} />}
              {/* <Button fullWidth variant="contained" sx={{mt: 3, mb: 2}}>Create New Lab Link</Button>} */}
              <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Join Online Lab
              </Button>
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
  };
}
export default connect(mapStateToProps)(NoticeBoard);
