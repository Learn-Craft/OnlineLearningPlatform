const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the CSS directory
app.use('/CSS', express.static(path.join(__dirname, 'CSS')));

// Serve HTML files using Express
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'views', 'home.html')));
app.get('/home.html', (req, res) => res.sendFile(path.join(__dirname, 'views', 'home.html')));
app.get('/about.html', (req, res) => res.sendFile(path.join(__dirname, 'views', 'about.html')));
app.get('/contact.html', (req, res) => res.sendFile(path.join(__dirname, 'views', 'contact.html')));
app.get('/courses.html', (req, res) => res.sendFile(path.join(__dirname, 'views', 'courses.html')));
app.get('/login.html', (req, res) => res.sendFile(path.join(__dirname, 'views', 'login.html')));
app.get('/playlist.html', (req, res) => res.sendFile(path.join(__dirname, 'views', 'playlist.html')));
app.get('/profile.html', (req, res) => res.sendFile(path.join(__dirname, 'views', 'profile.html')));
app.get('/register.html', (req, res) => res.sendFile(path.join(__dirname, 'views', 'register.html')));
app.get('/teacherprofile.html', (req, res) => res.sendFile(path.join(__dirname, 'views', 'teacher_profile.html')));
app.get('/teachers.html', (req, res) => res.sendFile(path.join(__dirname, 'views', 'teachers.html')));
app.get('/update.html', (req, res) => res.sendFile(path.join(__dirname, 'views', 'update.html')));
app.get('/watchvideo.html', (req, res) => res.sendFile(path.join(__dirname, 'views', 'watch_video.html')));

// Handle 404
app.use((req, res) => {
    res.status(404).send('Error 404: Page not found');
});

// Start the server
app.listen(2000, () => {
    console.log('Server running on http://127.0.0.1:2000');
});
