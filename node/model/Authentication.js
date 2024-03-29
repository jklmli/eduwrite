var User = require("./User.js");
var Role = require("./Role.js");

module.exports = new function() {
  var _this = this;

  /**
   * Handle return data from the database for user & password, and either allow them to login or reject their login.
   *
   * @param usersFound    The user data retrieved from the database
   */
  this.login = function(usersFound, req) {

    // If we couldn't find a user by this email/password, fail, otherwise, succeed
    if (usersFound.length < 1) {

      return false;

    } else {

      // Extract the user object from the first entry in the data
      req.session.user = usersFound[0];

      return true;
    }
  };

  /**
   * Allow a user to register if a user does not already exist with that email address
   *
   * @param usersFound  The data retrieved from the database
   */
  this.register = function(usersFound, req) {

    var email = req.body.email;
    var password = req.body.password;
    var role = req.body.role;
    // If we found a user with this email, fail, otherwise, succeed
    if (usersFound.length > 0) {
      return false;
    } else {

      var user = {
        email: email,
        password: password
      };

      // Register the user
      User.insert(user, function(e) {
        var userId = e.insertId;
        Role.assignByRoleName(userId, role, function(r) {

        });
        //TODO: insert into roles once role model is implemented
      });

      return true;
    }
  };

  return this;
};
