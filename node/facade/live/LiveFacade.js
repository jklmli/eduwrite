var User = require('../../model/User.js');
var Note = require('../../model/Note.js');
var Course = require('../../model/Course.js');
var Lecture = require('../../model/Lecture.js');
var Authentication = require('../../model/Authentication.js');
var Enrollment = require("../../model/Enrollment.js");
var mailHandler = require('mailer');
var Hashes = require('jshashes');
var bcrypt = require('bcrypt');

module.exports = new function() {
  var _this = this;

  /**
   * Registers a user if they are not already registered.
   */
  this.register = function(req, res) {
    var email = req.body.email;

    // Get the user by email address
    User.getByEmail(email)
      .then(function(usersFound) {
        var status = Authentication.register(usersFound, req)
            if (status === true) {
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
            }
            else {
              req.flash("error", "User with the email " + email + " already exists");
              res.redirect('back');
            }
      });
  };

  /**
   *  Sends an e-mail with the provided contents
   */
  this.sendEmail = function(to, subject, body) {
    
  }

  /**
   * Resets a user's password and sends it to them in an e-mail
   */
  this.resetPassword = function() {
    var user = req.session.user;
    var tempPassword = "";
    //generate a temporary password of 15 random numbers
    for (var i = 0; i < 15; i++) {
      tempPassword += Math.random();
    }
    user['password'] = encrypt(tempPassword);
    User.update(user)
      .then(function(e) {
        //send an e-mail to the user with the new password
        var message = "Hello,\n We just received a request to reset the password for your account.";
        message += "Please use the following temporary password to log in and then reset it again immediately.";
        message += "\n\n" + tempPassword + "\n\n";
        message += "If you did not request to reset your password, please contact us immediately.";
        message += "\n\nThanks You\n\n The EduWrite Team";
        email.send({
            host: "express-smtp.cites.uiuc.edu",
            port: "25",
            ssl: true,
            domain: "localhost",
            to: user['email'],
            from: "admin@eduwrite.com",
            subject: "[EduWrite] Password Reset",
            body: message,
          },
          function(err, result) {
            if (err) {
              console.log(err);
            }
          });
      });
  };

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
            User.updatePassword(user, newPassword)
              .then(function(success) {
                req.flash("success", "Your password has successfully been changed");
                res.redirect('back'); 
              });
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
   * Login a user if they exist and submit correct credentials, fail otherwise.
   */
  this.login = function(req, res) {

    var email = req.body.email;
    var password = req.body.password;

    User.getByEmailAndPassword(email, password)
      .then(function(usersFound) {

        // Display login success or failure message based on whether or not the login succeeded
        if (Authentication.login(usersFound, req)) {

          req.flash("success", "You have been successfully logged in to the site");
          res.redirect('/');

        } else {

          req.flash("error", "You have entered incorrect password, or the user with the email does not exists.");
          res.redirect('back');

        }
      });
  };

  /**
   * Get the notes for some user
   */
  this.getNotes = function(req, res) {
    var user = req.session.user;
    Note.getByUser(user)
      .then(function(notes) {
        res.contentType('json');
        res.send(notes);
      });
  };

  /**
   * Get the notes for some user
   */
  this.getNotesByUserId = function(req, res) {
    var user = req.session.user;
    if (!user) {
      res.send("{}");
    }
    Note.getByUser(user)
      .then(function(notes) {
        res.contentType('json');
        res.send(notes);
      });
  };

  this.getNotesByLectureId = function(req, res) {
    var lectureId = req.body.lectureId;
    Note.getByLectureId(lectureId)
      .then(function(notes) {
        res.contentType('json');
        res.send(notes);
      });
  };

  this.getLecturesByCourseId = function(req, res) {
    var courseId = req.body.courseId;
    Lecture.getByCourseId(courseId)
      .then(function(lectures) {
        res.contentType('json');
        res.send(lectures);
      });
  };

  this.getCourses = function(req, res) {
    var user = req.session.user;
    if (!user) {
      res.send("{}");
    } else {
      Enrollment.getCoursesByStudentId(user.id)
        .then(function(courses) {
          res.contentType('json');
          res.send(courses);
        });
    }
  };

  /**
   * Add a new note for some user
   */
  this.addNote = function(req, res) {
    var user = req.session.user;
    var lectureId = req.body.lectureId;
    var title = req.body.title;
    if (!user) {
      res.send("Please login first");
    }
    Note.create(user.id, lectureId,title)
        .then(function(result){
            res.contentType('json');
            res.send(result);
        });
  };

  return this;
};

