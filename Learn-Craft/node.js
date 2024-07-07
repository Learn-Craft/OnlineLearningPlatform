const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
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

// Serve static files from the 'css' directory
app.use('/css', express.static(path.join(__dirname, 'css')));

// Define a list of available pages
const pages = [
    'home', 'about', 'contact', 'courses', 'login', 
    'playlist', 'profile', 'register', 'teacher_profile', 
    'teachers', 'update', 'watch_video'
];

// Serve HTML files dynamically
pages.forEach(page => {
    app.get(`/${page}.html`, (req, res) => {
        res.sendFile(path.join(__dirname, 'views', `${page}.html`));
    });
});

// Handle the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'home.html'));
});

// Import and use authentication routes
app.use('/api/auth', require('./routes/auth'));

// Handle 404 errors
app.use((req, res) => {
    res.status(404).send('Error 404: Page not found');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://127.0.0.1:${PORT}`);
});
