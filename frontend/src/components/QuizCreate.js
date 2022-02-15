import React from "react";
import { connect } from "react-redux";

//Material UI
import { Grid } from "@mui/material";
import TextField from "@mui/material/TextField";

class QuizCreate extends React.Component {
  render() {
    return (
      <div>
        <Grid container direction="column" height="100vh">
        <TextField id="filled-basic" label="Filled" variant="filled" />
        </Grid>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    auth: state.auth,
    classroom: state.classroom,
  };
}
export default connect(mapStateToProps)(QuizCreate);
