var facade = require('./FacadeRoutes.js');

/**
 * Displays the homepage if the user is logged in, the login page otherwise.
 */
exports.home = function(req, res){

    // Show index if logged in, redirect otherwise
    if(req && req.session.user) {
        res.render('home', {
            title: 'EduWrite',
            loggedIn: true
        });

    } else {
        res.redirect('/login/');
    }
};

exports.register = function(req,res){
    res.render('users/register', {
        title: 'Register for EduWrite'
    });
};

exports.login = function(req,res){
    res.render('users/login', {
        title: 'Login to EduWrite'
    });
};

exports.logout = function(req,res){
    req.session.user = null;
    req.flash("success","You have been successfully logged out from the site");
    res.redirect('/');
};

exports.about = function(req,res) {
    res.render('about', {title: 'About EduWrite'});
};