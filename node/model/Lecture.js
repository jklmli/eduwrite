/*
 * Lecture.js
 * DB model for lectures
 */

var client = require("./Database.js").client;
var table = "lectures";

module.exports = {
  /*
   * Insert a new lecture into the table
   */
  insert:function (lecture, cb) {
    client
      .insert(table, lecture, cb);
  },

  /*
   * Get the entire record lecture record by its numerical id
   */
  get: function (id, cb) {
    client
      .get(table)
      .where("id='" + id + "'")
      .limit(1)
      .execute(cb);
  },

  /*
   * Get all of the lectures for a given course using the course_id
   */
  getByCourseId: function (courseId, cb) {
    client
      .get(table)
      .where("course_id='" + courseId + "'")
      .execute(cb);
  },

  /*
   * Get the lecture that occurred on a particular date
   */
  getByDate: function (day, cb) {
    client
      .get(table)
      .where("day='" + day + "'")
      .execute(cb);
  }
};
