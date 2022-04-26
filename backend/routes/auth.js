const { registerUser, loginUser, forgotPassword, verifyEmail, resetPassword } = require('../controllers/auth');

const router = require('express').Router();

router.post('/signup',registerUser);
router.post('/login',loginUser);
router.post('/forgotPassword',forgotPassword);
router.post('/verifyEmail',verifyEmail);
router.post('/resetPassword',resetPassword);


module.exports = router;