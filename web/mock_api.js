// Include authentication functionality
var authentication = require('./authentication.js');
var isLoggedIn = authentication.isLoggedIn;
var login = authentication.login;

/**
 *
 */
function getUserData(req, res) {

    // If the user is logged in,
    if (isLoggedIn(req.session)) {
        res.json({
            id: 1,
            userName: req.session.userName,
            firstName: "John",
            lastName: "Smith",
            facebookProfile: {
                someData: "BLARG",
                someMoreData: "BLARG"
            },
            classes: [3,4]
        });

    } else {
        login(req, res);
    }
}

function getClasses(req, res) {
    if (isLoggedIn(req.session)) {

        res.json([{
            id: 3,
            name: "CS 225",
            title: "Data Structures"
        }, {
            id: 4,
            name: "CS 241",
            title: "Systems Programming"
        }]);

    } else {
        login(req, res);
    }
}

function getLectures(req, res, classId) {
    if (isLoggedIn(req.session)) {

        res.json([{
            id: 8234,
            number: 1,
            classId: 3,
            date: "1/25/2012",
            title: "BST Trees (1)"
        }, {
            id: 8235,
            number: 2,
            classId: 3,
            date: "2/1/2012",
            title: "AVL Trees"
        }, {
            id: 8236,
            number: 1,
            classId: 4,
            date: "2/1/2012",
            title: "File I/O"
        }]);

    } else {
        login(req, res);
    }
}

function getUsers(req, res, lectureId) {
    if (isLoggedIn(req.session)) {

        res.json([{
            id: 1,
            userName: "jon",
            firstName: "Jon",
            lastName: "T"
        }, {
            id: 2,
            userName: "joe",
            firstName: "Joe",
            lastName: "G"
        }]);

    } else {
        login(req, res);
    }
}


// Chat functionality

function sendMessage(req, res, message) {
    if (isLoggedIn(req.session)) {
        res.send('Sent message to user(s)!');
    } else {
        login(req, res);
    }
}

function receiveMessage(req, res, callback) {
    if (isLoggedIn(req.session)) {
        res.send("Registered callback!");
    } else {
        login(req, res);
    }
}

function listUsers(req, res) {
    if (isLoggedIn(req.session)) {

        res.json([{
            id: 1,
            userName: "jon",
            firstName: "Jon",
            lastName: "T"
        }, {
            id: 2,
            userName: "joe",
            firstName: "Joe",
            lastName: "G"
        }, {
            id: 3,
            userName: "bob1",
            firstName: "Bob",
            lastName: "Who"
        }]);

    } else {
        login(req, res);
    }
}


// Search functionality
function search(req, res, query) {
    if (isLoggedIn(req.session)) {
        res.send("Here's some search results....");
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