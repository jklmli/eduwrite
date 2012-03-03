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
  if(!user){
    res.send("please login first");
  }
  Note.getByUser(user, function (err, notes){
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

    res.render("");
    console.log(notes);
  });
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


