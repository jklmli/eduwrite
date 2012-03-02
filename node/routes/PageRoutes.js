/**
 * Displays the homepage if the user is logged in, redirects to the login page otherwise.
 */
exports.home = function home(request, response) {

  // Show index if logged in, redirect otherwise
  if (request && request.session.user) {

    // Render the homepage template
    response.render('home', {
      title:   'EduWrite',
      loggedIn:true
    });

  } else {
    response.redirect('/login/');
  }
};

/**
 * Display the 'about' page with general information about EduWrite
 */
exports.about = function about(request, response) {
  response.render('about', {
    title:'About EduWrite'
  });
};

/**
 * Display the user registration page
 */
exports.register = function register(request, response) {
  response.render('users/register', {
    title:'Register for EduWrite'
  });
};

/**
 * Display the user login page
 */
exports.login = function login(request, response) {
  response.render('users/login', {
    title:'Login to EduWrite'
  });
};

/**
 * Display the user logout page
 */
exports.logout = function logout(request, response) {
  request.session.user = null;
  request.flash("success", "You have been successfully logged out from the site");
  response.redirect('/');
};

/**
 * Redirect to /accountManagement/profile
 * @param request
 * @param response
 */
exports.accountManagement = function accountManagement(request, response) {
    // Show index if logged in, redirect otherwise
    if (request && request.session.user) {

        response.redirect('/accountManagement/profile')

    } else {
        response.redirect('/login/');
    }
}

exports.accountManagementProfile = function accountManagementProfile(request, response) {
    // Show index if logged in, redirect otherwise
    if (request && request.session.user) {

        // Render the accountManagement page template
        response.render('users/accountManagement/profile', {
            title: 'Profile'
        });

    } else {
        response.redirect('/login/');
    }
}

exports.accountManagementNotePermissions = function accountManagementNotePermissions(request, response) {
    // Show index if logged in, redirect otherwise
    if (request && request.session.user) {

        // Render the accountManagement page template
        response.render('users/accountManagement/notePermissions', {
            title: 'Note Permissions'
        });

    } else {
        response.redirect('/login/');
    }
}