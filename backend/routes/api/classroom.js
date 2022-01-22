const express = require("express");
const router = express.Router();
const classroom = require("../../controllers/api/classroom");
const labs = require("../../controllers/api/labs");
const auth = require("../../config/authenticate");

router.post("/create", auth.authenticateToken, classroom.create);
router.post("/join", auth.authenticateToken, classroom.join);
router.get("/details", auth.authenticateToken, classroom.details);
router.get("/classroomDetails/:classroom_id", auth.authenticateToken, classroom.dashboard);
router.get("/previousChats/:room", auth.authenticateToken, classroom.previousChats);
router.post("/link", auth.authenticateToken, classroom.link);
router.post("/createLab", auth.authenticateToken, labs.createLab);
router.get("/fetchExistingLabDetails/:classroomId", auth.authenticateToken, labs.fetchExistingLabDetails);
router.get("/createEditor/:userId/:labId",auth.authenticateToken,labs.createEditor)
router.get("/unreadMessageCount/:classroomId", auth.authenticateToken, classroom.unreadMessageCount);


module.exports = router;
