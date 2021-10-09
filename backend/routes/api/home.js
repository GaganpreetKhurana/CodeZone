const express = require("express");
const router = express.Router();
const homeAPI = require("../../controllers/api/home");
const passport = require("passport");

router.get('/',homeAPI.home);


module.exports = router;