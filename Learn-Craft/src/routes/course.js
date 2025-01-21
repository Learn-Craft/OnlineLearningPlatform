const express = require('express');
const router = express.Router();
const { createCourse, enrollCourse, getCourses } = require('../controllers/courseController');

router.post('/create', authMiddleware, createCourse);
router.post('/enroll', authMiddleware, enrollCourse);
router.get('/', getCourses);

module.exports = router;
