var User = require('../../model/user.js');
//var Note = require('../../model/note.js');
/*
 * GET home page.
 */

exports.register = function(req,res){
    var email = req.body.email;
    var password = req.body.password;
    User.get_by_email(email,function(e){
        if(e.length>0){
            req.flash("error","User with the email "+email+" already exists");
            res.redirect('back');
        } else {
            var user = {email:email,password:password}
            User.insert(user,function(e){
                req.flash("success","You have been successfully registered to the site");
                res.redirect('/');
            });
        }
    })
};

exports.login = function(req,res){
    var email = req.body.email;
    var password = req.body.password;
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
/*
exports.getNotes = function(req,res){
    var user = req.session.user;
    Note.get_by_user_id(user.id,function(e){
        console.log(e);
    });
};
*/
