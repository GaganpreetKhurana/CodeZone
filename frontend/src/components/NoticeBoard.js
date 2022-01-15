import React from "react";
import { connect } from "react-redux";
import CreateLabDialog from "./CreateLabDialog";
import JoinLabDialog from "./JoinLabDialog";
import ShareLink from "./ShareLink";
import AddAnnouncement from "./AddAnnouncement";

//Material UI
import Card from "@mui/material/Card";
import { FlexRow, Item } from "@mui-treasury/component-flex";
import CardContent from "@mui/material/CardContent";
import { Paper, Button } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Typography from "@mui/material/Typography";


class NoticeBoard extends React.Component {
  render() {
    const { auth,classroomId } = this.props;
    const {ClassMeetLink} = this.props.classroom;
    const {announcements} = this.props.classroom;

    return (
      <div>
        <Paper >
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
                  <b>Announcements</b>
                </Typography>
              </Item>
            </FlexRow>
            <CardContent>
              {/* List or checkboxes ? */}
              {announcements.length === 0 && <>Wohoo!! No work due soon...</>}
              {announcements.length !== 0 && (
                <TableContainer>
                  <Table>
                    <TableBody>
                      {announcements.map((row) => (
                        <TableRow
                          key={row._id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row" align="center">
                            {row.content}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
              {auth.user.role === "Teacher" && (
                <AddAnnouncement classroom_id={classroomId} />
              )}
              {auth.user.role === "Teacher" && (
                <ShareLink classroom_id={classroomId} />
              )}
              <a href={ClassMeetLink} target="_blank" rel="noreferrer">
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={!ClassMeetLink}
                >
                  Online Class Link
                </Button>
              </a>
              {auth.user.role === "Teacher" && (
                <CreateLabDialog classroomId={classroomId} />
              )}
              <JoinLabDialog classroomId={classroomId} />
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
export default connect(mapStateToProps)(NoticeBoard);
