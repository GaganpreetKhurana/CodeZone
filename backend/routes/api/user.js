const express = require ( "express" );
const router = express.Router ();
const userAPI = require ( "../../controllers/api/users" );
const auth = require ( "../../config/authenticate" );

router.post ( '/login' , userAPI.login );
router.post ( '/signup' , userAPI.signup );
router.post('/updateProfile', auth.authenticateToken, userAPI.updateProfile);
router.get('/fetchUserDetails/:id', userAPI.fetchUserDetails);


module.exports = router;
