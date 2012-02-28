var authentication = require('./authentication.js');

/**
 * User registration facade methods
 */
exports.getUser = function getUser(id) {
    return {
        id: 1,
        userName: req.session.userName,
        firstName: "John",
        lastName: "Smith",
        facebookProfile: {
            someData: "BLARG",
            someMoreData: "BLARG"
        },
        classes: [3,4]
    };
};

exports.closeAccount = function closeAccount() {
    // TODO: Implement me!
};

exports.register = function register(email, password) {
    // TODO: Implement me!
};

exports.setPermissions = function setPermissions(userId, noteId, permissions){
    // TODO: Implement me!
};

exports.addNote = function addNote(lectureId, userId) {
    // TODO: Implement me!
};

exports.removeNote = function removeNote(noteId) {
    // TODO: Implement me!
};

exports.getNotesByUserId = function getNotesByUserId(req, res) {
    var userId = req.body.userId;
    res.contentType('json');
    res.send([{
        id: 3,
        name: "Lecture 12",
        location: "notes\\note5001"
    }, {
        id: 4,
        name: "My Second Note",
        location: "notes\\note5002"
    }]);
};

exports.updateNote = function updateNote() {
    // TODO: Implement me!
};

exports.getNotesByLectureId = function getNotesByLectureId(req, res) {
    var ret = [];
    var lectureId = req.body.lectureId;
    var notes = [{
        id: 9832498,
        title: "OH YEA",
        lectureId: 8234
    }, {
        id: 3429873,
        title: "My note",
        lectureId: 8234
    }, {
        id: 328932,
        title: "WOAH",
        lectureId: 8236
    }, {
        id:847592,
        title: "BOOYAH",
        lectureId: 8236
    }];
    for(i in notes){
        if(notes[i].lectureId == lectureId)
            ret.push(notes[i]);
    }
    res.contentType('json');
    res.send(ret);
};

exports.getNoteByNoteId = function getNoteByNoteId() {
    // TODO: Implement me!
};

exports.getLecturesByClassId = function getLecturesByClassId(req, res) {
    console.log("got here!");
    var ret = [];
    var classId = req.body.classId;
    var classes = [{
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
    }];
    for(i in classes){
        if(classes[i].classId == classId)
            ret.push(classes[i]);
    }
    res.contentType('json');
    res.send(ret);
};

exports.getClasses = function getClasses(req, res) {
    var id = req.body.userId;
    res.contentType('json');
    res.send([{
        id: 3,
        name: "CS 225",
        title: "Data Structures"
    }, {
        id: 4,
        name: "CS 241",
        title: "Systems Programming"
    }]);
};

exports.getInstructor = function getInstructor(classId) {
    // TODO: Implement me!
};

exports.addLecture = function addLecture(classId, data) {
    // TODO: Implement me!
};

exports.addClass = function addClass(data) {
    // TODO: Implement me!
};

exports.removeUser = function removeUser(userId) {
    // TODO: Implement me!
};

exports.login = authentication.login;
exports.logout = authentication.logout;
exports.isLoggedIn = authentication.isLoggedIn;