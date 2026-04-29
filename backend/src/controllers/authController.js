const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { sendOtpEmail } = require('../utils/mailer');

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const hash = await bcrypt.hash(password, 10);
  const user = await User.findOneAndUpdate(
    { email },
    { name, email, passwordHash: hash, verified: false, otpCode: otp, otpExpiresAt: new Date(Date.now() + 10 * 60000) },
    { upsert: true, new: true }
  );
  await sendOtpEmail(email, otp);
  res.json({ message: 'OTP sent to email', userId: user._id });
};

exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  const user = await User.findOne({ email });
  if (!user || user.otpCode !== otp || user.otpExpiresAt < new Date()) {
    return res.status(400).json({ message: 'Invalid or expired OTP' });
  }
  user.verified = true;
  user.otpCode = null;
  await user.save();
  res.json({ message: 'Email verified' });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !user.verified) return res.status(400).json({ message: 'Invalid credentials' });
  const ok = await bcrypt.compare(password, user.passwordHash || '');
  if (!ok) return res.status(400).json({ message: 'Invalid credentials' });
  const token = jwt.sign({ id: user._id, email: user.email, name: user.name, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
};
