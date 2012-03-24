// The facades to the real functionality
var mockFacade = require('../facade/mock/MockFacade.js');
var liveFacade = require('../facade/live/LiveFacade.js');

var facade;

//process.argv[2] = portnum
//process.argv[3] = type of server
var type = process.argv[3];
if (type != null && type == "live") {
  console.log("live facade running");
  facade = liveFacade;
} else {
  console.log("mock facade running");
  facade = mockFacade;
}

module.exports = {
  // User registration functions
  getUser:facade.getUser,
  closeAccount:facade.closeAccount,
  register:facade.register,

  // User permissions functions
  setPermissions:facade.setPermissions,

  // User notes functions
  getNotes:facade.getNotes,
  addNote:facade.addNote,
  removeNote:facade.removeNote,
  getNotesByUserId:facade.getNotesByUserId,
  updateNote:facade.updateNote,

  // User lectures functions
  getNotesByLectureId:facade.getNotesByLectureId,

  // User classes functions
  getLecturesByCourseId:facade.getLecturesByCourseId,
  getCourses:facade.getCourses,
  getInstructor:facade.getInstructor,

  // Instructor functions
  addLecture:facade.addLecture,
  addClass:facade.addClass,
  removeUser:facade.removeUser,

  // User + instructor account functionality
  login:facade.login,
  logout:facade.logout,
  isLoggedIn:facade.isLoggedIn
}
