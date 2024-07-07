const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const multer = require('multer');

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

const register = [
  upload.single('image'), // Handle the file upload
  async (req, res) => {
    const { username, email, password, c_password } = req.body;
    const image = req.file ? req.file.filename : null;

    if (password !== c_password) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    try {
      const user = new User({ username, email, password, image });
      await user.save();
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
];

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Fetch enrolled courses
    const enrollments = await Enrollment.find({ user: user._id }).populate('course');
    const courses = enrollments.map(enrollment => enrollment.course);

    res.status(200).json({ token, courses });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { register, login };
