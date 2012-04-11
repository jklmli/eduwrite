var authentication = require('./MockAuthentication.js');


module.exports = new function() {
  var _this = this;

  /**
   * Update a user's password
   */
  this.updatePassword = function(req, res) {
    var oldPassword = req.body.oldpassword;
    var newPassword = req.body.password;
    var confirmPassword = req.body.confirmpassword;
    var user = req.session.user;
    var email = user.email;
    // confirm the two new passwords match
    if (confirmPassword != newPassword) {
      req.flash("error", "The two passwords you entered did not match"); 
      res.redirect('back');       
    }
    else {
      // confirm the current password was entered correctly
      User.getByEmailAndPassword(email, oldPassword)
        .then(function(usersFound) {
          if (Authentication.login(usersFound, req)) {
            req.flash("success", "Your password has been changed successfully");
            res.redirect('back'); 
            //TODO: call facade function to make change once fixed 
            //update the password
            //User.updatePassword(user, newPassword)
              //.then(function(success) {
                //req.flash("success", "Your password has successfully been changed");
              //});
          } else {
            req.flash("error", "You entered your current password incorrectly");
            res.redirect('back');  
          }
        });
    }
  };

  /**
   * Update a user's email address
   */
  this.updateEmail = function(req, res) {
    var newEmail = req.body.newemail;
    var confirmEmail = req.body.confirmemail;
    var password = req.body.password;
    var user = req.session.user;
    var email = user.email;
    // confirm the two new emails match
    if (confirmEmail != newEmail) {
      req.flash("error", "The two emails you entered did not match"); 
      res.redirect('back');       
    }
    else {
      // confirm the password was entered correctly
      User.getByEmailAndPassword(email, password)
        .then(function(usersFound) {
          if (Authentication.login(usersFound, req)) {
            req.flash("success", "Your email has been updated successfully");
            res.redirect('back'); 
            //TODO: call facade function to make change once fixed 
            //update the email
            //User.updateEmail(user, newPassword)
              //.then(function(success) {
                //req.flash("success", "Your email has successfully been updated");
              //});
          } else {
            req.flash("error", "You entered your password incorrectly");
            res.redirect('back');  
          }
        });
    }
  };


  /**
   * Get a user by his/her id
   */
  this.getUser = function(id) {
    return {
      id: 1,
      userName: req.session.userName,
      firstName: "John",
      lastName: "Smith",
      facebookProfile: {
        someData: "BLARG",
        someMoreData: "BLARG"
      },
      courses: [3, 4]
    };
  };

  /**
   * Get the notes for a user by his/her id
   */
  this.getNotes = function(req, res) {
    var userId = req.body.userId;
    res.contentType('json');
    res.send([
      {
        id: 3,
        userId: "93",
        padId:"5",
        lectureId: "1",
        title: "new"

      },
      {
        id: 4,
        userId: "5",
        padId: "6",
        lectureId: "1",
        title: "My Second Note"
      }
    ]);
  };

  /**
   * Get the notes for a lecture by its id
   */
  this.getNotesByLectureId = function(req, res) {
    var ret = [];

    var lectureId = parseInt(req.body.lectureId);
    var notes = [
      {
        id: 9832498,
        title: "OH YEA",
        lectureId: 8234
      },
      {
        id: 3429873,
        title: "My note",
        lectureId: 8234
      },
      {
        id: 328932,
        title: "WOAH",
        lectureId: 8236
      },
      {
        id: 847592,
        title: "BOOYAH",
        lectureId: 8236
      }
    ];

    var i, len;
    for (i = 0, len = notes.length; i < len; i++) {
      if (notes[i].lectureId === lectureId)
        ret.push(notes[i]);
    }

    res.contentType('json');
    res.send(ret);
  };

  /**
   * Get the lectures for a course by the course's id
   */
  this.getLecturesByCourseId = function(req, res) {
    var ret = [];
    var courseId = parseInt(req.body.courseId);
    var lectures = [
      {
        id: 8234,
        number: 1,
        courseId: 3,
        date: "1/25/2012",
        title: "BST Trees (1)"
      },
      {
        id: 8235,
        number: 2,
        courseId: 3,
        date: "2/1/2012",
        title: "AVL Trees"
      },
      {
        id: 8236,
        number: 1,
        courseId: 4,
        date: "2/1/2012",
        title: "File I/O"
      }
    ];

    var i, len;
    for (i = 0, len = lectures.length; i < len; i++) {
      if (lectures[i].courseId === courseId)
        ret.push(lectures[i]);
    }

    res.contentType('json');
    res.send(ret);
  };

  this.getCourses = function(req, res) {
    var id = req.body.userId;

    var courses = [
      {
        id: 3,
        name: "CS 225",
        title: "Data Structures"
      },
      {
        id: 4,
        name: "CS 241",
        title: "Systems Programming"
      }
    ];

    res.contentType('json');
    res.send(courses);
  };

  // Expose the login/logout functions from authentication
  this.login = authentication.login;
  this.register = authentication.register;
  this.logout = authentication.logout;
  this.isLoggedIn = authentication.isLoggedIn;

  return this;
};
