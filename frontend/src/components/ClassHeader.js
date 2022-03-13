import React, { Component } from "react";
import { connect } from "react-redux";

//Mui
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";


class ClassHeader extends Component {
  render() {
    const title = this.props.classTitle;
    //const subheader = this.props.subheader;
    const description = this.props.description;
    //const creator = this.props.creator;
    //const enrolled = this.props.enrolled;
    //const classroomCode = this.props.classroomCode;

    // return <div>{match.params.classroomID}</div>;
    return (
      <div>
        <Grid
          item
          sx={{
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Grid
            sx={{
              pt: 3,
              pb: 2,
            }}
            m={2}
            direction="column"
            justifyContent="space-evenly"
            alignItems="center"
          >
            <Grid item m={2}>
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="text.primary"
              >
                {title}
              </Typography>
              <Typography
                variant="h5"
                align="center"
                color="text.secondary"
                paragraph
              >
                {description}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    classroom: state.classroom,
  };
}

export default connect(mapStateToProps)(ClassHeader);
