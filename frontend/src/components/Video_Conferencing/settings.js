import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";

const appId = "bd715cf7866249bcb2ebfe88615c9657";
const token ="006bd715cf7866249bcb2ebfe88615c9657IABAhoWFf8VScYxy86G3PxlmvWzl/ZbMJVssSahj/7Q9h2TNKL8AAAAAEABrDG+d10xJYgEAAQDYTEli";
//vp8 is algorithm to encode the video
export const config = { mode: "rtc", codec: "vp8", appId: appId, token: token };
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
export const channelName = "main";