
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'CS428 - Eduwrite' })
};

exports.register = function(req,res){
  res.render('users/register', {title: 'Register'});
};
