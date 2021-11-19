const express = require("express");
const router = express.Router();
const classroom = require("../../controllers/api/classroom");
const auth = require("../../config/authenticate");

router.post("/create", auth.authenticateToken, classroom.create);
router.post("/join", auth.authenticateToken, classroom.join);
router.get("/details", auth.authenticateToken, classroom.details);
router.get("/classroomDetails/:classroom_id", auth.authenticateToken, classroom.dashboard);

module.exports = router;