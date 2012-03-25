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
  this.insert = function(lecture) {
    client
      .insert(table, lecture);
  };

  /*
   * Get the entire record lecture record by its numerical id
   */
  this.get = function(id) {
    client
      .get(table)
      .where("id='" + id + "'")
      .limit(1)
      .execute();
  };

  /*
   * Get all of the lectures for a given course using the course_id
   */
  this.getByCourseId = function(courseId) {
    client
      .get(table)
      .where("course_id='" + courseId + "'")
      .execute();
  };

  /*
   * Get the lecture that occurred on a particular date
   */
  this.getByDate = function(day) {
    client
      .get(table)
      .where("day='" + day + "'")
      .execute();
  };

  return this;
};
