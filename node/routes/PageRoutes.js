var Enrollment = require("../model/Enrollment.js");
module.exports = new function() {
  var _this = this;

  /**
   * Displays the homepage if the user is logged in, redirects to the login page otherwise.
   */
  this.home = function(request, response) {

    // Show index if logged in, redirect otherwise
    if (request && request.session.user) {
      Enrollment.getCoursesByStudentId(request.session.user.id).then(function(coursesTaking){

      // Render the homepage template
        response.render('home', {
          title: 'EduWrite',
          loggedIn: true,
          courses: coursesTaking
        });
      })

    } else {
      response.redirect('/login/');
    }
  };

  /**
   * Display the 'about' page with general information about EduWrite
   */
  this.about = function(request, response) {
    response.render('about', {
      title: 'About EduWrite'
    });
  };

  /**
   * Display the user registration page
   */
  this.register = function(request, response) {
    response.render('users/register', {
      title: 'Register for EduWrite'
    });
  };

  /**
   * Display the user login page
   */
  this.login = function(request, response) {
    response.render('users/login', {
      title: 'Login to EduWrite'
    });
  };

  /**
   * Display the user logout page
   */
  this.logout = function(request, response) {
    request.session.user = null;
    request.flash("success", "You have been successfully logged out from the site");
    response.redirect('/');
  };

  /**
   * Redirect to /accountManagement/profile
   * @param request
   * @param response
   */
  this.accountManagement = function(request, response) {
    // Show index if logged in, redirect otherwise
    if (request && request.session.user) {

      response.redirect('/accountManagement/profile');

    } else {
      response.redirect('/login/');
    }
  };

  /**
   *  Redirect to /accountManagement/changeEmail
   *  @param request
   *  @param response
   */
  this.accountManagementChangeEmail = function(request, response) {
    // Confirm if user is logged in, redirect otherwise
    if(request && request.session.user) {
 
      response.render('users/accountManagement/changeEmail', {
        title: 'Update E-mail'
      });

    } else {
      response.redirect('/login/');
    }
  };

  /**
   * Redirect to /accountManagement/changePassword
   * @param request
   * @param response
   */
  this.accountManagementChangePassword = function(request, response) {
    // Confirm if user is logged in, redirect otherwise
    if(request && request.session.user) {

      response.render('users/accountManagement/changePassword', {
        title: 'Update Password'
      });

    } else {
        response.redirect('/login/');
    }
  };

  this.accountManagementProfile = function(request, response) {
    // Show index if logged in, redirect otherwise
    if (request && request.session.user) {

      // Render the accountManagement page template
      response.render('users/accountManagement/profile', {
        title: 'Profile'
      });

    } else {
      response.redirect('/login/');
    }
  };

  this.accountManagementNotePermissions = function(request, response) {
    // Show index if logged in, redirect otherwise
    if (request && request.session.user) {

      // Render the accountManagement page template
      response.render('users/accountManagement/notePermissions', {
        title: 'Note Permissions'
      });

    } else {
      response.redirect('/login/');
    }
  };

  this.accountManagementSettings = function(request, response) {
    // Show index if logged in, redirect otherwise
    if (request && request.session.user) {

      // Render the accountManagement page template
      response.render('users/accountManagement/settings', {
        title: 'Settings'
      });

    } else {
      response.redirect('/login/');
    }
  };

  this.accountManagementHelp = function(request, response) {
    // Show index if logged in, redirect otherwise
    if (request && request.session.user) {

      // Render the accountManagement page template
      response.render('users/accountManagement/help', {
        title: 'Help'
      });

    } else {
      response.redirect('/login/');
    }
  };

  return this;
};
