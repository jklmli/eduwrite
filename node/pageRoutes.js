exports.index = function(req, res){
    res.render('index', { title: 'CS428 - Eduwrite' })
};

exports.register = function(req,res){
    res.render('users/register', {title: 'Register'});
};

exports.login = function(req,res){
    res.render('users/login', {title: 'Login'});
};

exports.logout = function(req,res){
    req.session.user = null;
    req.flash("success","You have been successfully logged out from the site");
    res.redirect('/');
};