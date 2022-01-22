const express = require ( "express" );
const router = express.Router ();
const userAPI = require ( "../../controllers/api/users" );
const passport = require ( "passport" );

router.post ( '/login' , userAPI.login );
router.post ( '/signup' , userAPI.signup );

module.exports = router;