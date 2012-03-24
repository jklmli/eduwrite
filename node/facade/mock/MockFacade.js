var authentication = require('./MockAuthentication.js');

module.exports = {
  /**
   * Get a user by his/her id
   */
  getUser:function (id) {
    return {
      id:1,
      userName:req.session.userName,
      firstName:"John",
      lastName:"Smith",
      facebookProfile:{
        someData:"BLARG",
        someMoreData:"BLARG"
      },
      courses:[3, 4]
    };
  },

  /**
   * Get the notes for a user by his/her id
   */
  getNotesByUserId:function (req, res) {
    var userId = req.body.userId;
    res.contentType('json');
    res.send([
      {
        id:3,
        title:"Lecture 12",
        location:"notes\\note5001"
      },
      {
        id:4,
        title:"My Second Note",
        location:"notes\\note5002"
      }
    ]);
  },

  /**
   * Get the notes for a lecture by its id
   */
  getNotesByLectureId:function (req, res) {
    var ret = [];
    var lectureId = req.body.lectureId;
    var notes = [
      {
        id:9832498,
        title:"OH YEA",
        lectureId:8234
      },
      {
        id:3429873,
        title:"My note",
        lectureId:8234
      },
      {
        id:328932,
        title:"WOAH",
        lectureId:8236
      },
      {
        id:847592,
        title:"BOOYAH",
        lectureId:8236
      }
    ];
    for (i in notes) {
      if (notes[i].lectureId == lectureId)
        ret.push(notes[i]);
    }
    res.contentType('json');
    res.send(ret);
  },

  /**
   * Get the lectures for a course by the course's id
   */
  getLecturesByCourseId:function (req, res) {
    var ret = [];
    var courseId = req.body.courseId;
    var courses = [
      {
        id:8234,
        number:1,
        courseId:3,
        date:"1/25/2012",
        title:"BST Trees (1)"
      },
      {
        id:8235,
        number:2,
        courseId:3,
        date:"2/1/2012",
        title:"AVL Trees"
      },
      {
        id:8236,
        number:1,
        courseId:4,
        date:"2/1/2012",
        title:"File I/O"
      }
    ];
    for (i in courses) {
      if (courses[i].courseId == courseId)
        ret.push(courses[i]);
    }
    res.contentType('json');
    res.send(ret);
  },

  getCourses:function (req, res) {
    var id = req.body.userId;
    res.contentType('json');
    res.send([
      {
        id:3,
        name:"CS 225",
        title:"Data Structures"
      },
      {
        id:4,
        name:"CS 241",
        title:"Systems Programming"
      }
    ]);
  },

  // Expose the login/logout functions from authentication
  login:authentication.login,
  register:authentication.register,
  logout:authentication.logout,
  isLoggedIn:authentication.isLoggedIn
};
