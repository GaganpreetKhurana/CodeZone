const express = require ( 'express' );
const router = express.Router ();

router.use ( '/' , require ( './home' ) );
router.use ( '/users' , require ( './user' ) );
router.use ( '/classroom' , require ( './classroom' ) );
router.use ( '/forum' , require ( './forum' ) );
router.use ( '/announcements' , require ( './announcements' ) );
router.use ( '/editor' , require ( './editor' ) );
router.use ( '/quiz' , require ( './quiz' ) );
router.use ('/video', require('./video'));
module.exports = router;