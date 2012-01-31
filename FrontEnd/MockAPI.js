// Initialize the app
var express = require('express');
var app = express.createServer();

// Attach URL handlers
app.get('/', helloWorld);


function helloWorld(req, res) {
    res.send('Hello World!');
}



// Start the app listening on port 8000
app.listen(8000);
