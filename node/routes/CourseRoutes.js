/** Routes for lecture related operations 
  Following RESTful routing **/
module.exports = new function() {
  var _this = this;

  /**
    List all courses
    TODO: pagination sometime later
    **/
  this.index = function(req,res){
    res.render('courses/index', {
    });
  };


  /*
     New page to create a course
  */
  this.add = function(req,res){
    res.render('courses/add',{});
  };

  /**
    Create a course
    This should be only done by users with
    role as a professor
    **/
  this.create = function(req,res){
    res.redirect('/courses/'+id);
  };

  /**
    Show a course
    **/
  this.show = function(req,res){
    //get course with params[id]
    res.render('courses/show',{});
  };

  /*
     Edit a course
  */
  this.edit = function(req,res){
    res.render('courses/edit',{});
  };

  /**
    Update a course
    **/
  this.update = function(req,res){
    res.redirect('/courses/'+id);
  };

  /**
    Remove a course
    **/
  this.destroy = function(req,res){
    //remove all dependent lectures
    res.redirect('/courses/');
  };

  return this;
};
