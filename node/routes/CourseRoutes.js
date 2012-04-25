var Course = require("../model/Course.js");
var Lecture = require("../model/Lecture.js");
var Enrollment = require("../model/Enrollment.js");
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
      res.render('courses/index', {title:"List of courses",courses:courses})
    });
  };

  /**
    Show a course
    **/
  this.show = function(req,res){
    //get course with params[id]
    var id = req.params.id;
    Course.get(id).then(function(courses){
      var course = courses[0];
      //get related courses
      Lecture.getByCourseId(course.id).then(function(lectures){
        course.lectures = lectures;
        //get student enrollments
        Enrollment.getByCourseId(course.id).then(function(enrollments){
          course.enrollments = enrollments;
          res.render('courses/show',{course:course});
        });
      });
    });
  };


  /*
     New page to create a course
     Only professor should be able to create a course
  */
  this.add = function(req,res){
    //check if the user has a role called 'Professor' as one of the roles
    Course.get().then(function(courses){
      res.render('courses/add',{courses:courses});
    });
  };

  /**
    Create a course
    Only professors should be able to create a course
    **/
  this.create = function(req,res){
    //TODO:check if the user has Professor as one of the roles
    var course = req.body.course;
    Course.insert(course).then(function(result){
      var id = result.insertId;
      res.redirect('/courses/'+id);
    });
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
    Course.destroy(req.params.id).then(function(result){     
      res.redirect('/courses/');
    });
  };

  /**
    Add a current user to the course
    **/
  this.enroll = function(req,res){
    var courseId = req.params.courseId; 
    var user = req.session.user;
    if(typeof(user)==='undefined'){
      res.redirect('/courses/'+courseId);
    } else {

      var userId = user.id;

      Enrollment.getByUserIdAndCourseId(userId,courseId).then(function(result){
        if(result.length > 0){
          req.flash("error", "You are already enrolled to the course");
          res.redirect('/courses/'+courseId);
        }else{
          var enrollment = {courseId:courseId,userId:user.id};
          Enrollment.insert(enrollment).then(function(result){
            req.flash("success", "You have been successfully enrolled to the course");
            res.redirect('/courses/'+courseId);
          });
        }
      });
    }
  }

  return this;
};
