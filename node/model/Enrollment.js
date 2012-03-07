var client = require("./Database.js").client;
var table = "enrollments";

/**
 * Enrollment model tracks the students' enrollment in the courses.
 * 
 *
 */


exports.get = function (id, cb) {
  client
    .get(table)
    .where("id='" + id + "'")
    .limit(1)
    .execute(cb);
};



//exports.get_by_id = get; //for Janaki

exports.insert = function (enrollment, cb) {
  client
    .insert(table, course, cb);
};
