const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the CSS directory
app.use('/CSS', express.static(path.join(__dirname, 'CSS')));

// Serve HTML files using Express
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'views', 'home.html')));
app.get('/home', (req, res) => res.sendFile(path.join(__dirname, 'views', 'home.html')));
app.get('/about', (req, res) => res.sendFile(path.join(__dirname, 'views', 'about.html')));
app.get('/contact', (req, res) => res.sendFile(path.join(__dirname, 'views', 'contact.html')));
app.get('/courses', (req, res) => res.sendFile(path.join(__dirname, 'views', 'courses.html')));
app.get('/login', (req, res) => res.sendFile(path.join(__dirname, 'views', 'login.html')));
app.get('/playlist', (req, res) => res.sendFile(path.join(__dirname, 'views', 'playlist.html')));
app.get('/profile', (req, res) => res.sendFile(path.join(__dirname, 'views', 'profile.html')));
app.get('/register', (req, res) => res.sendFile(path.join(__dirname, 'views', 'register.html')));
app.get('/teacherprofile', (req, res) => res.sendFile(path.join(__dirname, 'views', 'teacher_profile.html')));
app.get('/teachers', (req, res) => res.sendFile(path.join(__dirname, 'views', 'teachers.html')));
app.get('/update', (req, res) => res.sendFile(path.join(__dirname, 'views', 'update.html')));
app.get('/watchvideo', (req, res) => res.sendFile(path.join(__dirname, 'views', 'watch_video.html')));

// Handle 404
app.use((req, res) => {
    res.status(404).send('Error 404: Page not found');
});

// Start the server
app.listen(2000, () => {
    console.log('Server running on http://127.0.0.1:2000');
});
