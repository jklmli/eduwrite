/**
 * This file deals with login/logout functionality, and related authentication operations (all mock!)
 */

var loggedIn = {};

module.exports = {
  /**
   * Register a new user account (just logs them in)
   */
  register:function (req, res) {
    this.login(req, res);
  },

  /**
   * Logs the user in without authentication
   */
  login:function (req, res) {

    if (!this.isLoggedIn(req.session)) {

      var email = req.param('email');
      var password = req.param('password');

      // Store login in session
      req.session.user = {
        email:email,
        password:password
      };

      if (email && password) {

        loggedIn[email] = true;
        req.flash("success", "Successfully logged in with " + email);
        console.log('Logged in as ' + email + '!');

      } else {
        console.log('Error, missing email or password for login!');
      }
    } else {
      console.log('Error, already logged in as ' + req.session.user.email + '!');
    }
    res.redirect('/');
  },

  /**
   * Log out of the user's current session
   */
  logout:function (req, res) {

    if (this.isLoggedIn(req.session)) {

      var email = req.session.user.email;
      loggedIn[email] = false;

      console.log('Logged out of ' + email);

      req.session.user = null;

    } else {
      res.redirect('/');
    }
  },

  /**
   * Checks if a user is logged in. (Silly implementation)
   *  @param session  The session from the request
   */
  isLoggedIn:function (session) {
    if (session && session.user)
      console.log("Checking logged in..." + loggedIn[session.user.email]);
    return session && session.user && loggedIn[session.user.email];
  }
};