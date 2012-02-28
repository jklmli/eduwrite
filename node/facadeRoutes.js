// The facades to the real functionality
var mockFacade = require('./facade/mock/mockFacade.js');
var liveFacade = require('./facade/live/liveFacade.js');

var facade = liveFacade;

// Attach URL handlers for facade calls
exports.getUser = facade.getUser;
exports.closeAccount = facade.closeAccount;
exports.register = facade.register;

exports.setPermissions = facade.setPermissions;

exports.getNotes = facade.getNotes;
exports.addNote = facade.addNote;
exports.removeNote = facade.removeNote;
exports.getNotesByUserId = facade.getNotesByUserId;
exports.updateNote = facade.updateNote;

exports.getNotesByLectureId = facade.getNotesByLectureId;

exports.getLecturesByClassId = facade.getLecturesByClassId;
exports.getClasses = facade.getClasses;
exports.getInstructor = facade.getInstructor;

exports.addLecture = facade.addLecture;
exports.addClass = facade.addClass;
exports.removeUser = facade.removeUser;

exports.login = facade.login;
exports.logout = facade.logout;
exports.isLoggedIn = facade.isLoggedIn;
