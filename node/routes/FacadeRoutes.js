// The facades to the real functionality
var mockFacade = require('../facade/mock/MockFacade.js');
var liveFacade = require('../facade/live/LiveFacade.js');

var facade;

//process.argv[2] = portnum
//process.argv[3] = type of server
var type = process.argv[3];
if (type !== null && type === "live") {
  console.log("live facade running");
  facade = liveFacade;
} else {
  console.log("mock facade running");
  facade = mockFacade;
}

methods = [
  // User registration functions
  'getUser',
  'closeAccount',
  'register',

  // User permissions functions
  'setPermissions',

  // User notes functions
  'getNotes',
  'addNote',
  'removeNote',
  'getNotesByUserId',
  'updateNote',

  // User lectures functions
  'getNotesByLectureId',

  // User classes functions
  'getLecturesByCourseId',
  'getCourses',
  'getInstructor',

  // Instructor functions
  'addLecture',
  'addClass',
  'removeUser',

  // User + instructor account functionality
  'login',
  'logout',
  'isLoggedIn', 
  'updatePassword'
];

var i, len;
for (i = 0, len = methods.length; i < len; i++) {
  module.exports[methods[i]] = facade[methods[i]];
}
