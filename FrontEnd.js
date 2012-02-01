/**
 * Script file to handle starting and configuring the front end server
 */
var express = require('express');

/**
 * Enable sessions for the users
 */
var secret = "dBYIfvlQfQfxILZWuhR9b3TOIQGeks9PHwAqikbaZ+EWD0bAt9GA32ZCMs5ZmQbQ";
var app = express.createServer(
    express.cookieParser(),
    express.session({
        secret: secret
    })
);

// Attach URL handlers
app.get('/', home);
app.get('/login', login);
app.get('/logout', logout);
app.get('/getUserData', getUserData);
app.get('/getClasses', getClasses);
app.get('/getLectures', getLectures);
app.get('/getUsers', getUsers);
app.get('/sendMessage', sendMessage);
app.get('/receiveMessage', receiveMessage);
app.get('/listUsers', listUsers);
app.get('/search', search);


/**
 * Returns the homepage
 */
function home(req, res) {
    res.send('<html><h1>Homepage</h1></html>');
}

// Start the app listening
app.listen(3000);