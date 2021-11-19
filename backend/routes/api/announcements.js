const express = require("express");
const router = express.Router();
const announcements = require("../../controllers/api/announcements");
const auth = require("../../config/authenticate");

router.post("/create", auth.authenticateToken, announcements.create);
router.delete('/delete', auth.authenticateToken, announcements.delete);
router.delete('/update', auth.authenticateToken, announcements.update);


module.exports = router;