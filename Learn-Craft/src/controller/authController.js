const User = require('../models/User');
const Enrollment = require('../models/Enrollment');
const bcryptjs = require('bcryptjs'); // Use only bcryptjs
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
      const hashedPassword = await bcryptjs.hash(password, 10); // Hash the password with bcryptjs
      const user = new User({ username, email, password: hashedPassword, image });
      await user.save();
      req.session.user = { id: user._id, name: user.username, email: user.email };
      res.redirect('/home.ejs'); // Redirect to home after successful registration
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

    const isMatch = await bcryptjs.compare(password, user.password); // Compare with bcryptjs
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Fetch enrolled courses
    const enrollments = await Enrollment.find({ user: user._id }).populate('course');
    const courses = enrollments.map(enrollment => enrollment.course);

    req.session.user = { id: user._id, name: user.username, email: user.email, courses: courses };
    res.redirect('/home.ejs'); // Redirect to home after successful login
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const logout = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ error: 'Failed to log out' });
    }
    res.redirect('/login.ejs');
  });
};

module.exports = { register, login, logout };
