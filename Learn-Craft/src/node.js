const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB().catch(err => {
    console.error('Failed to connect to MongoDB:', err);
});

// Initialize the Express app
const app = express();

// Set up middleware to parse JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'CSS', 'IMG', 'JS', and 'uploads' directories
app.use('/css', express.static(path.join(__dirname, 'CSS')));
app.use('/IMG', express.static(path.join(__dirname, 'IMG')));
app.use('/JS', express.static(path.join(__dirname, 'JS')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Set up session management
app.use(session({
    secret: 'your_secret_key', // Replace with your own secret key
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI })
}));

// Middleware to add user data to every response
app.use((req, res, next) => {
    res.locals.user = req.session.user;
    next();
});

// Set view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Import and use authentication routes
app.use('/api/auth', require('./routes/auth'));
app.use('/dashboard', require('./routes/dashboard')); // Add dashboard route

// Serve EJS templates dynamically
const pages = ['home', 'about', 'contact', 'courses', 'login', 'playlist', 'profile', 'register', 'teacher_profile', 'teachers', 'update', 'watch_video', 'blog'];
pages.forEach(page => {
    app.get(`/${page}.ejs`, (req, res) => {
        res.render(page, {   user: req.session.user });
    });
});

// Handle the root route
app.get('/', (req, res) => {
    res.render('home', { user: req.session.user });
});

// Handle 404 errors
app.use((req, res) => {
    res.status(404).send('Error 404: Page not found');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://127.0.0.1:${PORT}`);
});


