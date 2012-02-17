/**
 * This file deals with login/logout functionality, and related authentication operations
 */

/**
 * Logs the user in
 */
function login(req, res) {

    if (!isLoggedIn(req.session)) {

        var userName = req.param('userName');
        var password = req.param('password');

        if (userName && password) {

            req.session.userName = userName;
            req.session.password = password;

            res.send('Logged in as ' + userName + '!');

        } else {

            res.send('<html>' +
                    '<form action="/login" method="get">' +
                        'Username: <input type="text" name="userName"/><br/>' +
                        'Password: <input type="password" name="password"/><br/>' +
                        '<input type="submit" name="Submit" value="Submit"/>' +
                    '</form>' +
                '</html>')

        }

    } else {

        res.send('Already logged in as ' + req.session.userName);

    }
}


/**
 * Log out of the user's current session
 */
function logout(req, res) {

    if (isLoggedIn(req.session)) {

        res.send('Logged out of ' + req.session.userName);
        req.session.userName = null;
        req.session.password = null;

    } else {

        res.send('Not logged in!')    ;

    }
}

/**
 * Checks if a user is logged in. (Silly implementation)
 *  @param session  The session from the request
 */
function isLoggedIn(session) {
    return session.userName && session.password;
}


// Expose functions
module.exports.login = login;
module.exports.logout = logout;
module.exports.isLoggedIn = isLoggedIn;
