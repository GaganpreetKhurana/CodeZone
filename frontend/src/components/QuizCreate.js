import React from "react";
import { connect } from "react-redux";

//Material UI
import { Grid, Box ,Card ,Paper } from "@mui/material";
import TextField from "@mui/material/TextField";

class QuizCreate extends React.Component {
  render() {
    return (
      <div>
        <Paper height="100vh">
          <Box
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <Card
              sx={{
                minWidth: "100vh",
                minHeight: "70vh",
                bgcolor: (theme) =>
                  theme.palette.mode === "dark" ? "#272727" : "#fff",
                boxShadow: (theme) =>
                  theme.palette.mode === "dark"
                    ? "unset"
                    : "0 8px 16px 0 #BDC9D7",
              }}
            >
              <Grid container justifyContent="space-evenly" alignItems="center">
                <Grid item m={4} xs={12} sm={12} md={12}>
                  {" "}
                  <TextField
                    id="filled-basic"
                    label="Filled"
                    variant="filled"
                    fullWidth="True"
                  />
                </Grid>
              </Grid>
            </Card>
          </Box>
        </Paper>
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
