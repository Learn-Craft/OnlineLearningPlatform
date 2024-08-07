const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const connectDB = require('./config/db');


// Load environment variables
dotenv.config();

// Connect to MongoDB
(async () => {
    try {
        await connectDB();
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('Failed to connect to MongoDB:', err);
        process.exit(1); // Exit the process if DB connection fails
    }
})();

// Initialize the Express app
const app = express();

// Set up middleware to parse JSON and URL-encoded requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Serve static files from the 'CSS', 'IMG', 'JS', and 'uploads' directories
app.use('/css', express.static(path.join(__dirname, 'CSS')));
app.use('/IMG', express.static(path.join(__dirname, 'IMG')));
app.use('/JS', express.static(path.join(__dirname, 'JS')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Set up session management
app.use(session({
    secret: process.env.SESSION_SECRET || 'your_secret_key', // Replace with your own secret key
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: {
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        httpOnly: true // Helps mitigate the risk of client side script accessing the protected cookie
    }
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
const pages = ['home', 'about', 'contact', 'courses', 'login', 'playlist', 'profile', 'register', 'teacher_profile', 'teachers', 'update', 'watch_video', 'blog', 'business', 'web_development', 'design', 'it', 'marketing', 'personal_developmet', 'view_blog', 'software', 'science'];
pages.forEach(page => {
    app.get(`/${page}.ejs`, (req, res) => {
        res.render(page, { user: req.session.user });
    });
});

// Serve header and footer templates
app.get('/header.ejs', (req, res) => {
    res.render('header', { user: req.session.user });
});

app.get('/footer.ejs', (req, res) => {
    res.render('footer', { user: req.session.user });
});

// Handle the root route
app.get('/', (req, res) => {
    res.render('home', { user: req.session.user });
});

// Handle 404 errors
app.use((req, res) => {
    res.status(404).send('Error 404: Page not found');
});

// Handle other errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://127.0.0.1:${PORT}`);
});