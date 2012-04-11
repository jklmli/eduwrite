var Course = require("../model/Course.js");
var Lecture = require("../model/Lecture.js");

/** Routes for lecture related operations 
  Following RESTful routing **/
module.exports = new function() {
  var _this = this;
  this.index = function(req,res){
    

  };

  this.create = function(req,res){
    var lecture = req.body.lecture;
    Lecture.insert(lecture).then(function(result){
      var courseId = lecture.courseId;
      res.redirect('/courses/'+courseId);
    });

  }

  this.add = function(req,res){
    var courseId = req.params.courseId;
    Course.get(courseId).then(function(courses){
      var course = courses[0];
      res.render('lectures/add',{course:course});
    });
  }

  this.show = function(req,res){

  }

  this.update = function(req,res){
    //if req = GET

    //if req = POSt
  }

  this.destroy = function(req,res){
    
  }

  return this;
};
