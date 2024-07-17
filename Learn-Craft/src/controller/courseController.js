const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');

// Create new course
exports.createCourse = async (req, res) => {
  const { title, description } = req.body;
  const instructor = req.user.userId; // Assumes user is authenticated

  try {
    const course = new Course({ title, description, instructor });
    await course.save();
    res.status(201).json({ message: 'Course created successfully', course });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Enroll in a course
exports.enrollCourse = async (req, res) => {
  const { courseId } = req.body;
  const user = req.user.userId; // Assumes user is authenticated

  try {
    const enrollment = new Enrollment({ user, course: courseId });
    await enrollment.save();
    res.status(201).json({ message: 'Enrolled in course successfully', enrollment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch all courses
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('instructor', 'username email');
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
