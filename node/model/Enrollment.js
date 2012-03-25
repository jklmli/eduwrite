var client = require("./Database.js").client;
var table = "enrollment";

/**
 * Enrollment.js
 * Enrollment model tracks the students' enrollment in the courses.
 */

module.exports = new function() {
  var _this = this;

  /**
   *  Get an enrollment record by its unique id
   */
  this.get = function(id) {
    client
      .get(table)
      .where("id='" + id + "'")
      .limit(1)
      .execute();
  };

  /**
   *  Get all students in a course
   */
  this.getByCourseId = function(courseId) {
    client
      .get(table)
      .where("course_id = " + courseId)
      .execute();
  };

  /**
   *  Get the instructor(s) for a course
   */
  this.getByCourseAndRole = function(courseId, role) {
    client
      .get(table)
      .where("course_id = " + courseId + " and role = '" + role + "'")
      .execute();
  };

  /**
   *  Get a student in a course by netid
   */
  this.getByCourseAndUser = function(courseId, studentId) {
    client
      .get(table)
      .where("course_id = " + courseId + " and student_id = '" + studentId + "'")
      .limit(1)
      .execute();
  };

  /**
   *  Insert a new enrollment record into the database
   */
  this.insert = function(enrollment) {
    client
      .insert(table, course); // TODO: invalid parameter course
  };

  return this;
};
