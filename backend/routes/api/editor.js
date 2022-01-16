const express = require("express");
const router = express.Router();
const editorAPI = require("../../controllers/api/editor");
const passport = require("passport");
const auth = require("../../config/authenticate");

router.post('/compile', auth.authenticateToken,editorAPI.compile);


module.exports = router;