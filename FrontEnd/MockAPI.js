/**
 * Logs the user in
 */
function login(req, res) {

    if (req.session.userName == null && req.session.password == null) {

        var userName = req.param('userName');
        var password = req.param('password');

        req.session.userName = userName;
        req.session.password = password;

        res.send('Logged in as ' + userName);
    } else {

        res.send('Already logged in as ' + req.session.userName);

    }
}


/**
 * Log out of the user's current session
 */
function logout(req, res) {

    if (req.session.userName != null && req.session.password != null) {

        res.send('Logged out of ' + req.session.userName);
        req.session.userName = null;
        req.session.password = null;

    } else {

        res.send('Not logged in!')    ;

    }
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

// Expose functions to the module
module.exports.login = login;
module.exports.logout = logout;
module.exports.getUserData = getUserData;
module.exports.getClasses = getClasses;
module.exports.getLectures = getLectures;
module.exports.getUsers = getUsers;
module.exports.sendMessage = sendMessage;
module.exports.receiveMessage = receiveMessage;
module.exports.listUsers = listUsers;
module.exports.search = search;