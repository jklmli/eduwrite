// Include authentication functionality
var authentication = require('./Authentication');
var isLoggedIn = authentication.isLoggedIn;
var login = authentication.login;

// Basic navigation functionality
function getUserData(req, res) {
    if (isLoggedIn(req.session)) {
        res.send('getUserData');
    } else {
        login(req, res);
     }
}

function getClasses(req, res) {
    if (isLoggedIn(req.session)) {
        res.send('getUserData');
    } else {
        login(req, res);
     }
}

function getLectures(req, res, classId) {
    if (isLoggedIn(req.session)) {
        res.send('getUserData');
    } else {
        login(req, res);
     }
}

function getUsers(req, res, lectureId) {
    if (isLoggedIn(req.session)) {
        res.send('getUserData');
    } else {
        login(req, res);
     }
}


// Chat functionality

function sendMessage(req, res, message) {
    if (isLoggedIn(req.session)) {
        res.send('getUserData');
    } else {
        login(req, res);
     }
}

function receiveMessage(req, res, callback) {
    if (isLoggedIn(req.session)) {
        res.send('getUserData');
    } else {
        login(req, res);
     }
}

function listUsers(req, res) {
    if (isLoggedIn(req.session)) {
        res.send('getUserData');
    } else {
        login(req, res);
     }
}


// Search functionality
function search(req, res, query) {
    if (isLoggedIn(req.session)) {
        res.send('getUserData');
    } else {
        login(req, res);
     }
}

// Expose functions to the module
module.exports.login = authentication.login;
module.exports.logout = authentication.logout;
module.exports.getUserData = getUserData;
module.exports.getClasses = getClasses;
module.exports.getLectures = getLectures;
module.exports.getUsers = getUsers;
module.exports.sendMessage = sendMessage;
module.exports.receiveMessage = receiveMessage;
module.exports.listUsers = listUsers;
module.exports.search = search;