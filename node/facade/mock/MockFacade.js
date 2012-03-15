var authentication = require('./MockAuthentication.js');

/**
 * Get a user by his/her id
 */
exports.getUser = function getUser(id) {
  return {
    id:             1,
    userName:       req.session.userName,
    firstName:      "John",
    lastName:       "Smith",
    facebookProfile:{
      someData:    "BLARG",
      someMoreData:"BLARG"
    },
    classes:        [3, 4]
  };
};

/**
 * Get the notes for a user by his/her id
 */
exports.getNotesByUserId = function getNotesByUserId(req, res) {
  var userId = req.body.userId;
  res.contentType('json');
  res.send([
    {
      id:      3,
      title:   "Lecture 12",
      location:"notes\\note5001"
    },
    {
      id:      4,
      title:   "My Second Note",
      location:"notes\\note5002"
    }
  ]);
};

/**
 * Get the notes for a lecture by its id
 */
exports.getNotesByLectureId = function getNotesByLectureId(req, res) {
  var ret = [];
  var lectureId = req.body.lectureId;
  var notes = [
    {
      id:       9832498,
      title:    "OH YEA",
      lectureId:8234
    },
    {
      id:       3429873,
      title:    "My note",
      lectureId:8234
    },
    {
      id:       328932,
      title:    "WOAH",
      lectureId:8236
    },
    {
      id:       847592,
      title:    "BOOYAH",
      lectureId:8236
    }
  ];
  for (i in notes) {
    if (notes[i].lectureId == lectureId)
      ret.push(notes[i]);
  }
  res.contentType('json');
  res.send(ret);
};


/**
 * Get the lectures for a class by the class's id
 */
exports.getLecturesByCourseId = function getLecturesByCourseId(req, res) {
  var ret = [];
  var courseId = req.body.classId;
  var courses = [
    {
      id:     8234,
      number: 1,
      courseId:3,
      date:   "1/25/2012",
      title:  "BST Trees (1)"
    },
    {
      id:     8235,
      number: 2,
      courseId:3,
      date:   "2/1/2012",
      title:  "AVL Trees"
    },
    {
      id:     8236,
      number: 1,
      courseId:4,
      date:   "2/1/2012",
      title:  "File I/O"
    }
  ];
  for (i in courses) {
    if (courses[i].classId == courseId)
      ret.push(courses[i]);
  }
  res.contentType('json');
  res.send(ret);
};


exports.getCourses = function getCourses(req, res) {
  var id = req.body.userId;
  res.contentType('json');
  res.send([
    {
      id:   3,
      name: "CS 225",
      title:"Data Structures"
    },
    {
      id:   4,
      name: "CS 241",
      title:"Systems Programming"
    }
  ]);
};


// Expose the login/logout functions from authentication
exports.login = authentication.login;
exports.register = authentication.register;
exports.logout = authentication.logout;
exports.isLoggedIn = authentication.isLoggedIn;
