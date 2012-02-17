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

exports.getNotesByUserId = function getNoteByNoteId(noteId) {
    // TODO: Implement me!
};

exports.updateNote = function updateNote() {
    // TODO: Implement me!
};

exports.getNotesByLectureId = function getNotesByLectureId(lectureId) {
    // TODO: Implement me!
};

exports.getNoteByNoteId = function getNoteByNoteId() {
    // TODO: Implement me!
};

/**
 * User classes facade
 */
exports.getLecturesByClassId = function getLecturesByClassId(classId) {
    return [{
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
};

exports.getClasses = function getClasses(userId) {
    return [{
        id: 3,
        name: "CS 225",
        title: "Data Structures"
    }, {
        id: 4,
        name: "CS 241",
        title: "Systems Programming"
    }];
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