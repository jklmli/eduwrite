var User = require('../../model/User.js');
var Note = require('../../model/Note.js');
var Course = require('../../model/Course.js');
var Lecture = require('../../model/Lecture.js');
var Authentication = require('../../model/Authentication.js');
var mailHandler = require("../../../static/node_mailer");

module.exports = {
  /**
   * Registers a user if they are not already registered.
   */
  register:function (req, res) {
    var email = req.body.email;

    // Get the user by email address
    User.getByEmail(email, function (usersFound) {
      if (Authentication.register(usersFound, req)) {

        req.flash("success", "You have been successfully registered to the site");
        res.redirect('/');
        //send an e-mail confirmation to user
        //it does not seem to work yet
        /*
         var message = "Hello,\n Thank you for registering with EduWrite.  You can now log in and begin looking ";
         message += "for the notes associate with your classes.  If you did not sign up for an account with us, ";
         message += "please use the following link to remove your information from our system.";
         mailHandler.send({
         domain : "eduwrite.com",
         to : email,
         from : "admin@eduwrite.com",
         subject : "[EduWrite] Registration Confirmation",
         body: message,
         debug:true,
         //uses SMTP server
         host : "smtp.gmail.com",
         port : "465",
         ssl: true,
         authentication: "login",
         username : "eduwrite.com@gmail.com",
         password : "cs428cs429"
         },
         function(err, result){
         if(err){ console.log(err); }
         });
         */
      } else {
        req.flash("error", "User with the email " + email + " already exists");
        res.redirect('back');
      }
    });
  },

  /**
   * Resets a user's password and sends it to them in an e-mail
   */
  resetPassword:function () {
    var user = req.session.user;
    var tempPassword = "";
    //generate a temporary password of 15 random numbers
    for (var i = 0; i < 15; i++) {
      tempPassword += Math.random();
    }
    user['password'] = encrypt(tempPassword);
    User.update(user, function (e) {
      //send an e-mail to the user with the new password
      var message = "Hello,\n We just received a request to reset the password for your account.";
      message += "Please use the following temporary password to log in and then reset it again immediately.";
      message += "\n\n" + tempPassword + "\n\n";
      message += "If you did not request to reset your password, please contact us immediately.";
      message += "\n\nThanks You\n\n The EduWrite Team";
      email.send({
          host:"localhost",
          port:"25",
          ssl:true,
          domain:"localhost",
          to:user['email'],
          from:"admin@eduwrite.com",
          subject:"[EduWrite] Password Reset",
          body:message,
          authentication:"login",
          username:"my_username",
          password:"my_password"
        },
        function (err, result) {
          if (err) {
            console.log(err);
          }
        });
    });
  },

  /**
   * Login a user if they exist and submit correct credentials, fail otherwise.
   */
  login:function (req, res) {

    var email = req.body.email;
    var password = req.body.password;

    User.getByEmailAndPassword(email, password, function (usersFound) {

      // Display login success or failure message based on whether or not the login succeeded
      if (Authentication.login(usersFound, req)) {

        req.flash("success", "You have been successfully logged in to the site");
        res.redirect('/');

      } else {

        req.flash("error", "You have entered incorrect password, or the user with the email does not exists.");
        res.redirect('back');

      }
    });
  },


  /**
   * Get the notes for some user
   */
  getNotes:function (req, res) {
    var user = req.session.user;
    Note.getByUser(user, function (err, notes) {
      console.log(notes);
    });
  },


  /**
   * Get the notes for some user
   */
  getNotesByUserId:function (req, res) {
    var user = req.session.user;
    if (!user) {
      res.send("{}");
    }
    Note.getByUser(user, function (notes) {
      res.contentType('json');
      res.send(notes);
    });
  },


  getNotesByLectureId:function (req, res) {
    var lectureId = req.body.lectureId;
    Note.getByLectureId(lectureId, function (notes) {
      res.contentType('json');
      res.send(notes);
    });
  },

  getLecturesByCourseId:function (req, res) {
    var courseId = req.body.courseId;
    Lecture.getByCourseId(courseId, function (lectures) {
      res.contentType('json');
      res.send(lectures);
    });
  },

  getCourses:function (req, res) {
    var user = req.session.user;
    if (!user) {
      res.send("{}");
    }
    Course.getByUser(user, function (courses) {
      res.contentType('json');
      res.send(courses);
    });
  },

  /**
   * Add a new note for some user
   */
  addNote:function (req, res) {
    var user = req.session.user;
    if (!user) {
      res.send("Please login first");
    }
    Note.create(user.id, 1, null);
    res.send("Hello world");
  }
};

