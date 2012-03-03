var User = require('../../model/User.js');
var Note = require('../../model/Note.js');
var Authentication = require('../../model/Authentication.js');


/**
 * Registers a user if they are not already registered.
 */
exports.register = function (req, res) {

  var email = req.body.email;
  var password = req.body.password;

  // Get the user by email address
  User.getByEmail(email, function (usersFound) {

    if(Authentication.register(usersFound, req)) {

      req.flash("success", "You have been successfully registered to the site");
      res.redirect('/');

    } else {

      req.flash("error", "User with the email " + email + " already exists");
      res.redirect('back');

<<<<<<< HEAD

/**
 * Get the notes for some user
 */
exports.getNotesByUserId = function getNotesByUserId(req, res) {
  var user = req.session.user;
  if(!user){
    res.send("{}");
  }
  Note.getByUser(user, function (err, notes){
      res.contentType('json');
      res.send(notes);
      console.log(notes);
  });
};

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
 * Add a new note for some user
 */
exports.addNote = function (req, res) {
    var user = req.session.user;
    if(!user){
        res.send("Please login first");
    }
    Note.create(user.id,1,null);
    res.send("Hello world");
};
=======
    }
  });
};

  /**
   * Login a user if they exist and submit correct credentials, fail otherwise.
   */
  exports.login = function (req, res) {

    var email = req.body.email;
    var password = req.body.password;

    User.getByEmailAndPassword(email, password, function(usersFound) {

      // Display login success or failure message based on whether or not the login succeeded
      if(Authentication.login(usersFound, req)) {

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
   * Add a new note for some user
   */
  exports.addNote = function (req, res) {
  };
>>>>>>> d741819ea19a45593f0be490e2703dfffed00a07


