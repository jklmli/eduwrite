





/***
 *
 *        This file should be deleted. It has been merged to app.js file.
 *
**/















/**
 * Script file to handle starting and configuring the front end server
 */

// Includes
var express = require('express');
var mockAPI = require('./MockAPI');

// Just change this to use live API for deployment
var api = mockAPI;

// Parse port number from args
var port;
if(process.argv[2]==null){
    port = 8000;
} else {
    port = process.argv[2];
}

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

// Attach URL handlers for pages
app.get('/', home);

// Attach URL handlers for API calls
//app.get('/login', mockAPI.login);
app.get('/login', mockAPI.login);
app.get('/logout', api.logout);
app.get('/getUserData', api.getUserData);
app.get('/getClasses', api.getClasses);
app.get('/getLectures', api.getLectures);
app.get('/getUsers', api.getUsers);
app.get('/sendMessage', api.sendMessage);
app.get('/receiveMessage', api.receiveMessage);
app.get('/listUsers', api.listUsers);
app.get('/search', api.search);

/**
 * Returns the homepage
 */
function home(req, res) {
    res.send('<html>Homepage!</html>');
}

// Start the app listening
app.listen(port);
