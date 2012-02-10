var User = require('../model/user.js');
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
    res.send(req.body);
    var email = req.body.email;
    var password = req.body.password;
    User.get_by_email(email,function(e){
        
    })


//redirect to home
//show welcome alert

};
