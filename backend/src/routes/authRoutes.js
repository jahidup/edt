const router = require('express').Router();
const c = require('../controllers/authController');
router.post('/register', c.register);
router.post('/verify-otp', c.verifyOtp);
router.post('/login', c.login);
module.exports = router;
