var client = require("./Database.js").client;
var table = "enrollment";

/**
 * Enrollment.js
 * Enrollment model tracks the students' enrollment in the courses.
 */

module.exports = {
  /**
   *  Get an enrollment record by its unique id
   */
  get: function (id, cb) {
    client
      .get(table)
      .where("id='" + id + "'")
      .limit(1)
      .execute(cb);
  },

  /**
   *  Get all students in a course
   */
  getByCourseId: function (courseId, cb) {
    client
      .get(table)
      .where("course_id = " + courseId)
      .execute(cb)
  },

  /**
   *  Get the instructor(s) for a course
   */
  getByCourseAndRole: function (courseId, role, cb) {
    client
      .get(table)
      .where("course_id = " + courseId + " and role = '" + role + "'")
      .execute(cb)
  },

  /**
   *  Get a student in a course by netid
   */
  getByCourseAndUser: function (courseId, studentId, cb) {
    client
      .get(table)
      .where("course_id = " + courseId + " and student_id = '" + studentId + "'")
      .limit(1)
      .execute(cb)
  },

  /**
   *  Insert a new enrollment record into the database
   */
  insert: function (enrollment, cb) {
    client
      .insert(table, course, cb); // TODO: invalid parameter course
  }
};
