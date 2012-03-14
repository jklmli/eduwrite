var User = require('../../model/User.js');
var Note = require('../../model/Note.js');
var Lecture = require('../../model/Lecture.js');
var Authentication = require('../../model/Authentication.js');


/**
 * Registers a user if they are not already registered.
 */
exports.register = function (req, res) {

  var email = req.body.email;

  // Get the user by email address
  User.getByEmail(email, function (usersFound) {
    if (Authentication.register(usersFound, req)) {

      req.flash("success", "You have been successfully registered to the site");
      res.redirect('/');

    } else {

      req.flash("error", "User with the email " + email + " already exists");
      res.redirect('back');
    }
  });
};

/**
 * Resets a user's password and sends it to them in an e-mail
 */
exports.resetPassword = function () {
  var user = req.session.user;
  var tempPassword = "";
  //generate a temporary password of 15 random numbers
  for(var i = 0; i < 15; i++) {
	tempPassword += Math.random();  
  }
  user['password'] = tempPassword;
  User.update(user, function(e) {
	//send an e-mail to the user with the new password
	var message = "Hello,\n We just received a request to reset the password for your account.";
	message += "Please use the following temporary password to log in and then reset it again immediately.";
	message += "\n\n" + tempPassword + "\n\n";
	message += "If you did not request to reset your password, please contact us immediately.";
	message += "\n\nThanks You\n\n The EduWrite Team";
	
	var mailHandler = require("../../../static/node_mailer");
	email.send({
      host : "localhost",
      port : "25",
      ssl: true,
      domain : "localhost",
      to : user['email'],
      from : "admin@eduwrite.com",
      subject : "[EduWrite] Password Reset",
      body: message,
      authentication : "login",
	  username : "my_username",
      password : "my_password"
    },
    function(err, result){
      if(err){ console.log(err); }
    });
  })
}

/**
 * Login a user if they exist and submit correct credentials, fail otherwise.
 */
exports.login = function (req, res) {

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
};


/**
 * Get the notes for some user
 */
exports.getNotes = function (req, res) {
  var user = req.session.user;
  Note.getByUser(user, function (err, notes) {
    console.log(notes);
  });
};


/**
 * Get the notes for some user
 */
exports.getNotesByUserId = function getNotesByUserId(req, res) {
  var user = req.session.user;
  if (!user) {
    res.send("{}");
  }
  Note.getByUser(user, function (notes) {
    res.contentType('json');
    res.send(notes);
  });
};


exports.getNotesByLectureId = function getNotesByLectureId(req, res) {
  var lectureId = req.body.lectureId;
  Note.getByLectureId(lectureId, function(notes){
    res.contentType('json');
    res.send(notes);
  });
};

exports.getLecturesByCourseId = function getNotesByCourseId(req, res) {
  var courseId = req.body.courseId;
  Lecture.getByCourseId(courseId, function(notes){
    res.contentType('json');
    res.send(notes);
  });
};

exports.getCourses = function getCourses(req,res){
  var user = req.session.user;
  if(!user){
    res.send("{}");
  }
  Course.getByUser(user,function(courses){
    res.contentType('json');
    res.send(notes);
  });
};

/**
 * Add a new note for some user
 */
exports.addNote = function (req, res) {
  var user = req.session.user;
  if (!user) {
    res.send("Please login first");
  }
  Note.create(user.id, 1, null);
  res.send("Hello world");
};

