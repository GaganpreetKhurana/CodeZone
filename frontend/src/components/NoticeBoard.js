import React from "react";
import { connect } from "react-redux";
import Button from '@mui/material/Button';

//Material UI
import { Grid} from '@mui/material';

class NoticeBoard extends React.Component {
  render() {
    const { auth } = this.props;

    return (
          <Grid item xs={4}>
            <div className="notice-board">
              <div className="announcements">
                  <span className="notice-header">Announcements :</span>
                  <div className="horizontal"></div>
                  <span className="row"> Wohoo! No work due soon</span>
                  {/* <div className="horizontal"></div> */}
              </div>
              {auth.user.role === "Teacher" && <Button fullWidth variant="contained" sx={{mt: 3, mb: 2}}>Share Class Link</Button>}
              <Button fullWidth variant="contained" sx={{mt: 3, mb: 2}}>Online Class Link</Button>
              {auth.user.role === "Teacher" && <Button fullWidth variant="contained" sx={{mt: 3, mb: 2}}>Create New Lab Link</Button>}
              <Button fullWidth variant="contained" sx={{mt: 3, mb: 2}}>Join Online Lab</Button>
            </div>
          </Grid>
    );
  }
}
function mapStateToProps(state) {
    return {
      auth: state.auth,
      darkModetheme: state.theme
    };
  }
export default connect(mapStateToProps)(NoticeBoard);
