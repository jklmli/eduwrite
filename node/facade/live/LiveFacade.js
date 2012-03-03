var User = require('../../model/User.js');
var Note = require('../../model/Note.js');
var login = require('../../model/Login.js');
var register = require('../../model/Register.js');


/**
 * Registers a user if they are not already registered.
 */
exports.register = function (req, res) {

  var email = req.body.email;
  var password = req.body.password;

  // Get the user by email address
  User.getByEmail(email, login.login);
};


/**
 * Login a user if they exist and submit correct credentials, fail otherwise.
 */
exports.login = function (req, res) {

  var email = req.body.email;
  var password = req.body.password;

  User.getByEmailAndPassword(email, password, register.register);
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


