var client = require("./Database.js").client;
var table = "enrollment";

/**
 * Enrollment model tracks the students' enrollment in the courses.
 */

/**
 *  Get an enrollment record by its unique id
 */
exports.get = function (id, cb) {
  client
    .get(table)
    .where("id='" + id + "'")
    .limit(1)
    .execute(cb);
};

/**
 *  Get all students in a course
 */
exports.get = function (courseId, cb) {
  client
    .get(table)
	.where("course_id = " + courseId)
	.execute(cb)
};

/**
 *  Get the instructor(s) for a course
 */
exports.get = function (courseId, role) {
  client
    .get(table)
	.where("course_id = " + courseId + " and role = '" + role + "'")
	.execute(cb)
}

/**
 *  Get a student in a course by netid
 */
exports.get = function (courseId, studentId) {
  client
    .get(table)
	.where("course_id = " + courseId + " and netid = '" + studentId + "'")
	.limit(1)
	.execute(cb)
}

/**
 *  Insert a new enrollment record into the database
 */
exports.insert = function (enrollment, cb) {
  client
    .insert(table, course, cb);
};
