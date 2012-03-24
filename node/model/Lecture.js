/*
 * Lecture.js
 * DB model for lectures
 */

var client = require("./Database.js").client;
var table = "lectures";

module.exports = new function() {
  var _this = this;

  /*
   * Insert a new lecture into the table
   */
  this.insert = function(lecture, cb) {
    client
      .insert(table, lecture, cb);
  };

  /*
   * Get the entire record lecture record by its numerical id
   */
  this.get = function(id, cb) {
    client
      .get(table)
      .where("id='" + id + "'")
      .limit(1)
      .execute(cb);
  };

  /*
   * Get all of the lectures for a given course using the course_id
   */
  this.getByCourseId = function(courseId, cb) {
    client
      .get(table)
      .where("course_id='" + courseId + "'")
      .execute(cb);
  };

  /*
   * Get the lecture that occurred on a particular date
   */
  this.getByDate = function(day, cb) {
    client
      .get(table)
      .where("day='" + day + "'")
      .execute(cb);
  };

  return this;
};
