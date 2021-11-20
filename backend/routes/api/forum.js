const express = require("express");
const router = express.Router();
const passport = require("passport");
const forum = require("../../controllers/api/forum");
const auth = require("../../config/authenticate");

router.post("/create/post", auth.authenticateToken, forum.create);
router.get('/delete/post::post_id', auth.authenticateToken, forum.delete);
router.post('/update/post', auth.authenticateToken, forum.update);
router.get('/like/post::post_id', auth.authenticateToken, forum.like);

router.post("/create/comment", auth.authenticateToken, forum.createComment);
router.get('/delete/comment::comment_id', auth.authenticateToken, forum.deleteComment);
router.post('/update/comment', auth.authenticateToken, forum.updateComment);
router.get('/like/comment::comment_id', auth.authenticateToken, forum.likeComment);

module.exports = router;