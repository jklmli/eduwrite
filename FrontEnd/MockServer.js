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

var secret = "dBYIfvlQfQfxILZWuhR9b3TOIQGeks9PHwAqikbaZ+EWD0bAt9GA32ZCMs5ZmQbQ";

// Create a store for authentication
var store = new express.session.MemoryStore;
app.use(express.cookieParser());
app.use(express.session({
    secret: secret,
    store: store
}));

/**
 * Logs the user in
 */
function login(req, res) {
    var userName = req.param('userName');
    var password = req.param('password');

    req.session.userName = userName;
    req.session.password = password;

    res.send('Logged in as ' + userName);
}


/**
 * Log out of the user's current session
 */
function logout(req, res) {
    req.session.userName = null;
    req.session.password = null;
    res.send('Content-Type', 'text/json');
    res.send('Logging out of ' + req.session.userName);
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
