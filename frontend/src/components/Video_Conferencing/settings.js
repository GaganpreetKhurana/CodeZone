import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";

const appId = "bd715cf7866249bcb2ebfe88615c9657";
// const token ="006bd715cf7866249bcb2ebfe88615c9657IABAhoWFf8VScYxy86G3PxlmvWzl/ZbMJVssSahj/7Q9h2TNKL8AAAAAEABrDG+d10xJYgEAAQDYTEli";
const video_token = localStorage.getItem("video_token");
const token = video_token ? video_token : '006bd715cf7866249bcb2ebfe88615c9657IAAF5h7kjESl+5tGCf6gl4MuFJ60Yy/NY6vNEa0Wwb72hWTNKL8AAAAAEAAMxKVfj5RKYgEAAQAfUUli';
//vp8 is algorithm to encode the video
export const config = { mode: "rtc", codec: "vp8", appId: appId, token: token };
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
export const channelName = "main";