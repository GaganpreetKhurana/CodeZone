const express = require("express");
const router = express.Router();
const passport = require("passport");
const classroom = require("../../controllers/api/classroom");
const auth = require("../../config/authenticate");

router.post("/create",auth.authenticateToken, classroom.create);
// router.post('/join',passport.authenticate('jwt',{session:false}), classroom.join);

module.exports = router;
