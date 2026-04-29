const Course = require('../models/Course');

exports.getCourses = async (_req, res) => res.json(await Course.find().sort({ createdAt: -1 }));
exports.getCourseBySlug = async (req, res) => {
  const course = await Course.findOne({ slug: req.params.slug });
  if (!course) return res.status(404).json({ message: 'Not found' });
  res.json(course);
};
exports.createCourse = async (req, res) => res.status(201).json(await Course.create(req.body));
exports.updateCourse = async (req, res) => res.json(await Course.findByIdAndUpdate(req.params.id, req.body, { new: true }));
exports.deleteCourse = async (req, res) => {
  await Course.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
};
