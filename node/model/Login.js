/**
 * Handle return data from the database for user & password, and either allow them to login or reject their login.
 *
 * @param usersFound    The user data retrieved from the database
 */
exports.login = function login(usersFound) {

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
};