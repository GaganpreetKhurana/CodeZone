const express = require("express");
const router = express.Router();
const passport = require("passport");
const forum = require("../../controllers/api/forum");
const auth = require("../../config/authenticate");

router.post("/createPost", auth.authenticateToken, forum.create);
router.delete('/deletePost', auth.authenticateToken, forum.delete);
router.post('/updatePost', auth.authenticateToken, forum.update);
router.post('/likePost', auth.authenticateToken, forum.like);
router.delete('/dislikePost', auth.authenticateToken, forum.dislike);

router.post("/createComment", auth.authenticateToken, forum.createComment);
router.delete('/deleteComment', auth.authenticateToken, forum.deleteComment);
router.post('/updateComment', auth.authenticateToken, forum.updateComment);
router.post('/likeComment', auth.authenticateToken, forum.likeComment);
router.delete('/dislikeComment', auth.authenticateToken, forum.dislikeComment);


module.exports = router;