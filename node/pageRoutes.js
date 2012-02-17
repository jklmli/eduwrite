var facade = require('./facadeRoutes.js');

/**
 * Displays the homepage if the user is logged in, the login page otherwise.
 */
exports.index = function(req, res){

    // Show index if logged in, redirect otherwise
    if(req && facade.isLoggedIn(req.session)) {

        res.render('index', {
            title: 'CS428 - Eduwrite'
        });

    } else {
        res.redirect('/users/login');
    }
};

exports.register = function(req,res){
    res.render('users/register', {title: 'Register'});
};

exports.login = function(req,res){
    res.render('users/login', {
        title: 'EduWrite Login'
    });
};

exports.logout = function(req,res){
    req.session.user = null;
    req.flash("success","You have been successfully logged out from the site");
    res.redirect('/');
};