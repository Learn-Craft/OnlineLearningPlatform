// importing the required modules
const fs = require("fs");
const http = require("http");
const home = fs.readFileSync("../Home.html");
const about = fs.readFileSync("../About.html");
const contact = fs.readFileSync("../Contact.html");
const courses = fs.readFileSync("../Courses.html");
const logIn = fs.readFileSync("../Login.html");
const playlist = fs.readFileSync("../Playlist.html");
const profile = fs.readFileSync("../Profile.html");
const register = fs.readFileSync("../Register.html");
const teacher_profile = fs.readFileSync("../Teacher_profile.html");
const teachers = fs.readFileSync("../Teachers.html");
const update = fs.readFileSync("../Update.html");
const watch_video = fs.readFileSync("../Watch-video.html");

// creating the server
const createServer = http.createServer( (request, response) =>{
    // setting the route
    let url = request.url;
    if(url==="/"||url.toLocaleLowerCase()==="/home"){
        response.end(home);
    }
    else if(url.toLocaleLowerCase()==="/about"){
        response.end(about);
    }
    else if(url.toLocaleLowerCase()==="/contact"){
        response.end(contact);
    }
    else if(url.toLocaleLowerCase()==="/courses"||url.toLocaleLowerCase()==="/course"){
        response.end(courses);
    }
    else if(url.toLocaleLowerCase()==="/login"){
        response.end(logIn);
    }
    else if(url.toLocaleLowerCase()==="/playlist"){
        response.end(playlist);
    }
    else if(url.toLocaleLowerCase()==="/profile"){
        response.end(profile);
    }
    else if(url.toLocaleLowerCase()==="/register"){
        response.end(register);
    }
    else if(url.toLocaleLowerCase()==="/teacherprofile"){
        response.end(teacher_profile);
    }
    else if(url.toLocaleLowerCase()==="/teachers"||url.toLocaleLowerCase()==="/teacher"){
        response.end(teachers);
    }
    else if(url.toLocaleLowerCase()==="/update"){
        response.end(update);
    }
    else if(url.toLocaleLowerCase()==="/watchvideo"){
        response.end(watch_video);
    }
    else{
        response.end("Error 404: Page not found");
    }
});

// Starting the server
createServer.listen(1000, '127.0.0.1', ()=>{
    console.log("hello");
})