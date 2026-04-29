const Lead = require('../models/Lead');
const Enrollment = require('../models/Enrollment');

exports.createLead = async (req, res) => {
  const lead = await Lead.create({ ...req.body, user: req.user?.id });
  if (req.user?.id && req.body.course) {
    await Enrollment.findOneAndUpdate(
      { user: req.user.id, course: req.body.course },
      { status: 'interested' },
      { upsert: true, new: true }
    );
  }
  res.status(201).json(lead);
};

exports.getLeads = async (_req, res) => res.json(await Lead.find().populate('course user').sort({ createdAt: -1 }));
