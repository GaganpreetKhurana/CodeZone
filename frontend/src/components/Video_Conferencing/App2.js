import { useState } from "react";
import { Button } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import VideoCall from "./VideoCall";

function App2() {
  const [inCall, setInCall] = useState(false);
  return (
    <div className="App" style={{ height: "100%" }}>
      <Grid
        container
        spacing={24}
        justify="center"
        alignItems="column"
        style={{ minHeight: "100vh", maxWidth: "100%" }}
      >
        {inCall ? (
          <Grid
            item
            m={2}
          >
            <VideoCall setInCall={setInCall} />
            </Grid>
        ) : (
          <Grid
            item
            xs={3}
            align="center"
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => setInCall(true)}
            >
              Join Call
            </Button>
          </Grid>
        )}
      </Grid>
    </div>
  );
}

export default App2;