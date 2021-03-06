const express = require("express");
const router = express.Router();
const quiz = require("../../controllers/api/quiz");
const auth = require("../../config/authenticate");

router.post("/create", auth.authenticateToken, quiz.create);
router.get('/delete::quiz_id', auth.authenticateToken, quiz.delete);
router.post('/update', auth.authenticateToken, quiz.update);
router.get('/fetch/:quiz_id', auth.authenticateToken, quiz.view);
router.post('/updateAnswer::quiz_id', auth.authenticateToken, quiz.updateAnswer);
router.post('/submit/:quiz_id', auth.authenticateToken, quiz.submit);
router.get('/fetchAll/:classroom_id', auth.authenticateToken, quiz.fetchAll);

router.get('/result/student/:classroom_id', auth.authenticateToken, quiz.fetchStudentResult);
router.get('/result/class/:quiz_id', auth.authenticateToken, quiz.fetchClassResult);
router.get('/submission/:submission_id', auth.authenticateToken, quiz.fetchSubmission);
router.get('/tabSwitch/:quiz_id', auth.authenticateToken, quiz.tabSwitch);





module.exports = router;