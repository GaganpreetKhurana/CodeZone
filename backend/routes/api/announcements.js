const express = require("express");
const router = express.Router();
const announcements = require("../../controllers/api/announcements");
const auth = require("../../config/authenticate");

router.post("/create", auth.authenticateToken, announcements.create);
router.get('/delete:announcement_id', auth.authenticateToken, announcements.delete);
router.post('/update', auth.authenticateToken, announcements.update);


module.exports = router;