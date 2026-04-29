const router = require('express').Router();
const auth = require('../middleware/auth');
const Enrollment = require('../models/Enrollment');
const User = require('../models/User');

router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user.id).select('-passwordHash -otpCode');
  res.json(user);
});

router.put('/me', auth, async (req, res) => {
  const user = await User.findByIdAndUpdate(req.user.id, { name: req.body.name }, { new: true }).select('-passwordHash -otpCode');
  res.json(user);
});

router.get('/me/enrollments', auth, async (req, res) => {
  const enrollments = await Enrollment.find({ user: req.user.id }).populate('course');
  res.json(enrollments);
});

module.exports = router;
