var Course = require('../model/course.js');
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'CS428 - Eduwrite' })
};

exports.register = function(req,res){
    res.render('users/register', {title: 'Register'});
};

exports.registerProcess = function(req,res){
    var email = req.body.user.email;
    var password = req.body.user.password;
    User.get_by_email(email,function(e){
        if(e.length>0){
            req.flash("error","User with the email "+email+" already exists");
            res.redirect('back');
        } else {
            User.insert(req.body.user);
            req.flash("success","You have been successfully registered to the site");
            res.redirect('/');
        }
    })
};

exports.login = function(req,res){
    res.render('users/login', {title: 'Login'});
};

exports.loginProcess = function(req,res){
    var email = req.body.user.email;
    var password = req.body.user.password;
    User.get_by_email_and_password(email,password,function(e){
        if(e.length<1){
            req.flash("error","You have entered incorrect password, or the user with the email does not exists.");
            res.redirect('back');
        } else {
            //first element in the result array
            req.session.user = e[0];
            req.flash("success","You have been successfully logged in to the site");
            res.redirect('/');
        }
    })
};

exports.logout = function(req,res){
    req.session.user = null;
    req.flash("success","You have been successfully logged out from the site");
    res.redirect('/');
};

