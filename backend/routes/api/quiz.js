const express = require("express");
const router = express.Router();
const quiz = require("../../controllers/api/quiz");
const auth = require("../../config/authenticate");

router.post("/create", auth.authenticateToken, quiz.create);
router.get ( '/delete::quiz_id' , auth.authenticateToken , quiz.delete );
router.post ( '/update' , auth.authenticateToken , quiz.update );


module.exports = router;