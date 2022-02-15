const express = require("express");
const router = express.Router();
const quiz = require("../../controllers/api/quiz");
const auth = require("../../config/authenticate");

router.post("/create", auth.authenticateToken, quiz.create);
// router.get ( '/delete::announcement_id' , auth.authenticateToken , announcements.delete );
// router.post ( '/update' , auth.authenticateToken , announcements.update );


module.exports = router;