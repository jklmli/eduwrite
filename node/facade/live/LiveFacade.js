var User = require('../../model/User.js');
var Note = require('../../model/Note.js');

/**
 * Registers a user if they are not already registered.
 */
exports.register = function (req, res) {

  var email = req.body.email;
  var password = req.body.password;

  // Get the user by email address
  User.get_by_email(email, function (data) {

    // If we found a user with this email, fail, otherwise, succeed
    if (data.length > 0) {

      req.flash("error", "User with the email " + email + " already exists");
      res.redirect('back');

    } else {

      var user = {
        email:   email,
        password:password
      };

      // Register the user
      User.insert(user, function () {
        req.flash("success", "You have been successfully registered to the site");
        res.redirect('/');
      });
    }
  })
};


/**
 * Login a user if they exist and submit correct credentials, fail otherwise.
 */
exports.login = function (req, res) {

  var email = req.body.email;
  var password = req.body.password;

  User.get_by_email_and_password(email, password, function (usersFound) {

    // If we couldn't find a user by this email/password, fail, otherwise, succeed
    if (usersFound.length < 1) {

      req.flash("error", "You have entered incorrect password, or the user with the email does not exists.");
      res.redirect('back');

    } else {

      // Extract the user object from the first entry in the data
      req.session.user = usersFound[0];
      req.flash("success", "You have been successfully logged in to the site");
      res.redirect('/');
    }
  })
};


/**
 * Get the notes for some user
 */
exports.getNotes = function (req, res) {
  var user = req.session.user;
  Note.get_by_user(user, function (err, notes) {
    console.log(notes);
  });
};


/**
 * Add a new note for some user
 */
exports.addNote = function (req, res) {
};


