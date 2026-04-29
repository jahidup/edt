const router = require('express').Router();
const c = require('../controllers/courseController');
const auth = require('../middleware/auth');
router.get('/', c.getCourses);
router.get('/:slug', c.getCourseBySlug);
router.post('/', auth, c.createCourse);
router.put('/:id', auth, c.updateCourse);
router.delete('/:id', auth, c.deleteCourse);
module.exports = router;
