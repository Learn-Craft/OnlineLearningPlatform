// importing the required modules
const fs = require("fs");
const http = require("http");

// creating the server
const createServer = http.createServer( (request, response) =>{
    // setting the route
    let url = request.url;
    if(url==="/"||url==="/Home"){
        response.end("You are on the home page");
    }
    else{
        response.end("Error 404: Page not found");
    }
});

// Starting the server
createServer.listen(1000, '127.0.0.1', ()=>{
    console.log("hello");
})