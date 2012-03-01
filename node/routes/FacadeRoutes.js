// The facades to the real functionality
var mockFacade = require('../facade/mock/mockFacade.js');
var liveFacade = require('../facade/live/liveFacade.js');

var facade = mockFacade;

// User registration functions
exports.getUser = facade.getUser;
exports.closeAccount = facade.closeAccount;
exports.register = facade.register;

// User permissions functions
exports.setPermissions = facade.setPermissions;

// User notes functions
exports.getNotes = facade.getNotes;
exports.addNote = facade.addNote;
exports.removeNote = facade.removeNote;
exports.getNotesByUserId = facade.getNotesByUserId;
exports.updateNote = facade.updateNote;

// User lectures functions
exports.getNotesByLectureId = facade.getNotesByLectureId;

// User classes functions
exports.getLecturesByClassId = facade.getLecturesByClassId;
exports.getClasses = facade.getClasses;
exports.getInstructor = facade.getInstructor;

// Instructor functions
exports.addLecture = facade.addLecture;
exports.addClass = facade.addClass;
exports.removeUser = facade.removeUser;

// User + instructor account functionality
exports.login = facade.login;
exports.logout = facade.logout;
exports.isLoggedIn = facade.isLoggedIn;
