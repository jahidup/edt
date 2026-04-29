const router = require('express').Router();
const c = require('../controllers/leadController');
const auth = require('../middleware/auth');
router.post('/', c.createLead);
router.get('/', auth, c.getLeads);
module.exports = router;
