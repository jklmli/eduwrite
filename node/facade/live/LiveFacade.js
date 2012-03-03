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


