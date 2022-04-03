const express = require("express");
const router = express.Router();
const { RtcTokenBuilder, RtcRole } = require("agora-access-token");
const APP_ID = "bd715cf7866249bcb2ebfe88615c9657";
const APP_CERTIFICATE = "72f533aa5adc4fe5837a15f9f4803fe5";

const nocache = (req, res, next) => {
  res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
  res.header("Expires", "-1");
  res.header("Pragma", "no-cache");
  next();
};

const generateAccessToken = (req, res) => {
  res.header("Acess-Control-Allow-Origin", "*");
  const channelName = "main";
  if (!channelName) {
    return res.status(500).json({ error: "channel is required" });
  }
  let uid = req.query.uid;
  if (!uid || uid == "") {
    uid = 0;
  }
  let role = RtcRole.SUBSCRIBER;
  if (req.query.role == "publisher") {
    role = RtcRole.PUBLISHER;
  }
  let expireTime = req.query.expireTime;
  if (!expireTime || expireTime == "") {
    expireTime = 3600000000;
  }
  const currentTime = Math.floor(Date.now() / 1000);
  const privilegeExpireTime = currentTime + expireTime;
  const token = RtcTokenBuilder.buildTokenWithUid(
    APP_ID,
    APP_CERTIFICATE,
    channelName,
    uid,
    role,
    privilegeExpireTime
  );
  return res.status(200).json({ token: token, success: true });
};

router.get("/access_token", nocache, generateAccessToken);
module.exports = router;
