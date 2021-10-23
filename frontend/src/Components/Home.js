import React from "react";
import {Grid,Typography,Button,Paper} from '@mui/material'

function Home() {
  return (
    <div>
      <h1> Welcome to HomePage of CODEZONE</h1>
      <Paper style={{ height: "100vh" }}>
      <Grid container direction="column">
      <Typography variant="h1"> This is my App!</Typography>
      <Button variant="contained" color="primary">
      This is a button
      </Button>
      <Button variant="contained" color="secondary">
      This is another button
      </Button>
      </Grid>
      </Paper>
    </div>
  );
}

export default Home;
