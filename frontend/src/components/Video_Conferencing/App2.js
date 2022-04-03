import { useState } from "react";
import { Button } from "@material-ui/core";
import VideoCall from "./VideoCall";

function App2() {
  const [inCall, setInCall] = useState(false);

  return (
    <div className="App" style={{ height: "90vh"}}>
      
      {inCall ? (
        <VideoCall setInCall={setInCall} />
      ) : (
        <div style={{ width: "100%",height: "100%", paddingLeft:"40%",paddingTop:"20%" }}>
          Welcome to the Online Class !! <br></br>

        <Button
          variant="contained"
          color="primary"
          onClick={() => setInCall(true)}
          style={{marginLeft:'5%'}}
        >
          Join Call
        </Button>
        </div>
      )}
      
    </div>
  );
}

export default App2;