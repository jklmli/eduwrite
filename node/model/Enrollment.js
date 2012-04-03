/**
 * Enrollment.js
 * Enrollment model tracks the students' enrollment in the courses.
 */

var client = require("./Database.js").client;
var table = "enrollment";

module.exports = new function() {
  var _this = this;

  /**
   *  Get an enrollment record by its unique id
   *  @param id unique id of the enrollment record
   */
  this.get = function(id) {
    return client
      .get(table)
      .where("id='" + id + "'")
      .limit(1)
      .execute();
  };

  /**
   *  Get all courses that studentId is enrolled in
   *  @param studentId the unique id of the user
   */
  this.getCoursesByStudentId = function(studentId) {
    var condition = table + ".courseId = courses.id";
    return client
      .get(table)
      .join("courses", condition)
      .where("studentId = " + studentId)
      .execute();
  };

  /**
   *  Get all students in a course
   *  @param courseId the unique id of the course
   */
  this.getByCourseId = function(courseId) {
    return client
      .get(table)
      .where("courseId = " + courseId)
      .execute();
  };

  /**
   *  Get the instructor(s) for a course
   *  @param courseId the unique id of the course
   *  @param role whether user is student or instructor
   */
  this.getByCourseAndRole = function(courseId, role) {
    return client
      .get(table)
      .where("courseId = " + courseId + " and role = '" + role + "'")
      .execute();
  };

  /**
   *  Get a student in a course by netid
   *  @param courseId the unique id of the course
   *  @param studentId the unique id of the user
   */
  this.getByCourseAndUser = function(courseId, studentId) {
    return client
      .get(table)
      .where("courseId = " + courseId + " and studentId = '" + studentId + "'")
      .limit(1)
      .execute();
  };

  /**
   *  Insert a new enrollment record into the database
   *  @param enrollment the Enrollment object to insert
   */
  this.insert = function(enrollment) {
    return client
      .insert(table, course); // TODO: invalid parameter course
  };

  return this;
};
