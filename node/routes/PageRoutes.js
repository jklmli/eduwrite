module.exports = {
  /**
   * Displays the homepage if the user is logged in, redirects to the login page otherwise.
   */
  home: function (request, response) {

    // Show index if logged in, redirect otherwise
    if (request && request.session.user) {

      // Render the homepage template
      response.render('home', {
        title: 'EduWrite',
        loggedIn: true
      });

    } else {
      response.redirect('/login/');
    }
  },

  /**
   * Display the 'about' page with general information about EduWrite
   */
  about: function (request, response) {
    response.render('about', {
      title: 'About EduWrite'
    });
  },

  /**
   * Display the user registration page
   */
  register: function (request, response) {
    response.render('users/register', {
      title: 'Register for EduWrite'
    });
  },

  /**
   * Display the user login page
   */
  login: function (request, response) {
    response.render('users/login', {
      title: 'Login to EduWrite'
    });
  },

  /**
   * Display the user logout page
   */
  logout: function (request, response) {
    request.session.user = null;
    request.flash("success", "You have been successfully logged out from the site");
    response.redirect('/');
  },

  /**
   * Redirect to /accountManagement/profile
   * @param request
   * @param response
   */
  accountManagement: function (request, response) {
    // Show index if logged in, redirect otherwise
    if (request && request.session.user) {

      response.redirect('/accountManagement/profile')

    } else {
      response.redirect('/login/');
    }
  },

  accountManagementProfile: function (request, response) {
    // Show index if logged in, redirect otherwise
    if (request && request.session.user) {

      // Render the accountManagement page template
      response.render('users/accountManagement/profile', {
        title: 'Profile'
      });

    } else {
      response.redirect('/login/');
    }
  },

  accountManagementNotePermissions: function (request, response) {
    // Show index if logged in, redirect otherwise
    if (request && request.session.user) {

      // Render the accountManagement page template
      response.render('users/accountManagement/notePermissions', {
        title: 'Note Permissions'
      });

    } else {
      response.redirect('/login/');
    }
  },

  accountManagementSettings: function (request, response) {
    // Show index if logged in, redirect otherwise
    if (request && request.session.user) {

      // Render the accountManagement page template
      response.render('users/accountManagement/settings', {
        title: 'Settings'
      });

    } else {
      response.redirect('/login/');
    }
  },

  accountManagementHelp: function (request, response) {
    // Show index if logged in, redirect otherwise
    if (request && request.session.user) {

      // Render the accountManagement page template
      response.render('users/accountManagement/help', {
        title: 'Help'
      });

    } else {
      response.redirect('/login/');
    }
  }
};