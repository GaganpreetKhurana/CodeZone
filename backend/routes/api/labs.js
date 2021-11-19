const express = require("express");
const router = express.Router();
const labs = require("../../controllers/api/labs");
const auth = require("../../config/authenticate");

router.post("/createLab", auth.authenticateToken, labs.createLab);

module.exports = router;