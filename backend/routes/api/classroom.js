const express = require("express");
const router = express.Router();
const classroom = require("../../controllers/api/classroom");
const labs = require("../../controllers/api/labs");
const auth = require("../../config/authenticate");

router.post("/create", auth.authenticateToken, classroom.create);
router.post("/join", auth.authenticateToken, classroom.join);
router.get("/details", auth.authenticateToken, classroom.details);
router.get("/discussionForum", auth.authenticateToken, classroom.forum);

// create new lab
router.post("/createLab", auth.authenticateToken, labs.createLab);
router.get("/fetchExistingLabDetails/:classroomId", auth.authenticateToken, labs.fetchExistingLabDetails);

module.exports = router;
