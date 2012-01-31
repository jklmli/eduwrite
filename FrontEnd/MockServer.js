// Initialize the app
var express = require('express');
var app = express.createServer();

// Attach URL handlers
app.get('/', index);
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
 * Logs the user in
 */
function login(req, res, userName, password) {
    res.send('<html>' +
        'Logging in...' +
        '<b>Username:</b> ' + userName + '<br/>' +
        '<b>Password:</b> ' + password + '<br/>' +
        '</html>')
}


/**
 * Log out of the user's current session
 */
function logout(req, res) {
    res.send('logout');
}


// Basic navigation functionality

function getUserData(req, res) {
    res.send('getUserData');
}

function getClasses(req, res) {
    res.send('getClasses');
}

function getLectures(req, res, classId) {
    res.send('getLectures');
}

function getUsers(req, res, lectureId) {
    res.send('getUsers');
}


// Chat functionality

function sendMessage(req, res, message) {
    res.send('sendMessage');
}

function receiveMessage(req, res, callback) {
    res.send('receiveMessage');
}

function listUsers(req, res) {
    res.send('listUsers');
}


// Search functionality
function search(req, res, query) {
    res.send('search');
}




/**
 * Returns the homepage
 */
function index(req, res) {
    res.send('<html><h1>Homepage</h1></html>');
}



// Start the app listening
app.listen(3000);
