/**
 * User registration facade methods
 */
function getUser(id) {
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
}
function closeAccount() {
    // TODO: Implement me!
}
function register(email, password) {
    // TODO: Implement me!
}

/**
 * User permissions facade methods
 */
function setPermissions(userId, noteId, permissions){
    // TODO: Implement me!
}

/**
 * User permissions facade methods
 */
function addNote(lectureId, userId) {
    // TODO: Implement me!
}
function removeNote(noteId) {
    // TODO: Implement me!
}
function getNotesByUserId(userId) {
    // TODO: Implement me!
}
function getNoteByNoteId(noteId) {
    // TODO: Implement me!
}
function updateNote() {
    // TODO: Implement me!
}


/**
 * User lectures facade
 */
function getNotesByLectureId(lectureId) {
    // TODO: Implement me!
}


/**
 * User classes facade
 */
function getLecturesByClassId(classId) {
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
}
function getClasses(userId) {
    return [{
        id: 3,
        name: "CS 225",
        title: "Data Structures"
    }, {
        id: 4,
        name: "CS 241",
        title: "Systems Programming"
    }];
}
function getInstructor(classId) {
    // TODO: Implement me!
}

/**
 * User login/account facade
 */
function login(user, password) {
    // TODO: Implement me!
}
function logout() {
    // TODO: Implement me!
}

/**
 * Instructor facade
 */
function addLecture(classId, data) {
    // TODO: Implement me!
}
function addClass(data) {
    // TODO: Implement me!
}
function removeUser(userId) {
    // TODO: Implement me!
}


// Expose functions to the module
exports.getUser = getUser;
exports.closeAccount = closeAccount;
exports.register = register;

exports.setPermissions = setPermissions;

exports.addNote = addNote;
exports.removeNote = removeNote;
exports.getNotesByUserId = getNoteByNoteId;
exports.updateNote = updateNote;

exports.getNotesByLectureId = getNotesByLectureId;

exports.getLecturesByClassId = getLecturesByClassId;
exports.getClasses = getClasses;
exports.getInstructor = getInstructor;

exports.addLecture = addLecture;
exports.addClass = addClass;
exports.removeUser = removeUser;

exports.login = login;
exports.logout = logout;