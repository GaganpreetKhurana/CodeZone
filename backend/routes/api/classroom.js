const express = require("express");
const router = express.Router();
const passport = require("passport");
const classroom = require("../../controllers/api/classroom");

router.post('/create', classroom.create);
router.post('/join', classroom.join);

module.exports = router;