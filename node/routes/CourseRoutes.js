var Course = require("../model/Course.js");


/** Routes for lecture related operations 
  Following RESTful routing **/
module.exports = new function() {
  var _this = this;

  /**
    List all courses
    TODO: pagination sometime later
    **/
  this.index = function(req,res){
    Course.get().then(function(courses){
      
      res.render('courses/index', {title:"List of couses",courses:courses})
    });;
  };


  /*
     New page to create a course
     Only professor should be able to create a course
  */
  this.add = function(req,res){
    //check if the user has Professor as one of the roles
    res.render('courses/add',{});
  };

  /**
    Create a course
    Only professors should be able to create a course
    **/
  this.create = function(req,res){
    //check if the user has Professor as one of the roles
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
    //check if the user is owner of the course (or just any professor can edit?)
    res.render('courses/edit',{});
  };

  /**
    Update a course
    **/
  this.update = function(req,res){
    //check if the user is owner of the course (or just any professor can update?)
    res.redirect('/courses/'+id);
  };

  /**
    Remove a course
    **/
  this.destroy = function(req,res){
    //check the permission
    //remove all dependent lectures
    res.redirect('/courses/');
  };

  return this;
};
