/**
 * Allow a user to register if a user does not already exist with that email address
 *
 * @param data  The data retrieved from the database
 */
exports.register = function register(data) {

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
};
