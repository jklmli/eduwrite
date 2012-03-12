// The facades to the real functionality
var mockFacade = require('../facade/mock/MockFacade.js');
var liveFacade = require('../facade/live/LiveFacade.js');

var facade;

//process.argv[2] = portnum
//process.argv[3] = type of server
var type = process.argv[3];
if(type!=null && type=="live"){
  console.log("live facade running");
  facade = liveFacade;
} else {
  console.log("mock facade running");
  facade = mockFacade;
}
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
