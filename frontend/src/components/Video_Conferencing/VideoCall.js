import { useState, useEffect } from "react";
import {
  config,
  useClient,
  useMicrophoneAndCameraTracks,
  channelName,
} from "./settings.js";
import { Grid } from "@material-ui/core";
import Video from "./Video";
import Controls from "./Controls";

function VideoCall(props) {
  const { setInCall } = props;
  const [users, setUsers] = useState([]);
  const [start, setStart] = useState(false);
  const client = useClient();
  const { ready, tracks } = useMicrophoneAndCameraTracks();

  useEffect(() => {
    let init = async (name) => {
      // a user has to publish the stream to agora server so that when other clients join they can subscribe to other's users stream from server
      client.on("user-published", async (user, mediaType) => {
        //   subscribe to other users stream already present in that room
        await client.subscribe(user, mediaType);
        if (mediaType === "video") {
          setUsers((prevUsers) => {
            return [...prevUsers, user];
          });
        }
        if (mediaType === "audio") {
          user.audioTrack.play();
        }
      });

      client.on("user-unpublished", (user, mediaType) => {
        if (mediaType === "audio") {
          if (user.audioTrack) user.audioTrack.stop();
        }
        if (mediaType === "video") {
          setUsers((prevUsers) => {
            return prevUsers.filter((User) => User.uid !== user.uid);
          });
        }
      });

      client.on("user-left", (user) => {
        setUsers((prevUsers) => {
          return prevUsers.filter((User) => User.uid !== user.uid);
        });
      });

      try {
        await client.join(config.appId, name, config.token, null);
        //to join the room null is uid if it is null then uid gets automatically generated at the backend
      } catch (error) {
        console.log("errorrrrrrrrrrrrr");
      }

      //publishing the stream
      if (tracks) await client.publish([tracks[0], tracks[1]]);
      setStart(true);
    };

    if (ready && tracks) {
      try {
        //publishing our stream to the channel we joined
        init(channelName);
      } catch (error) {
        console.log(error);
      }
    }
    // eslint-disable-next-line
  }, [channelName, client, ready, tracks]);

  return (
    <Grid container spacing={2} direction="column">
      <Grid item style={{ height: "95%" }}>
        {start && tracks && <Video tracks={tracks} users={users} />}
      </Grid>
      <Grid item style={{ height: "5%", marginLeft: "40%" }}>
        {ready && tracks && (
          <Controls tracks={tracks} setStart={setStart} setInCall={setInCall} />
        )}
      </Grid>
    </Grid>
  );
}
export default VideoCall;
