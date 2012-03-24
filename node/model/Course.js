var client = require("./Database.js").client;
var table = "courses";

module.exports = new function() {
  var _this = this;

  this.get = function(id, cb) {
    client
      .get(table)
      .where("id='" + id + "'")
      .limit(1)
      .execute(cb);
  };

  this.getBySchoolId = function(schoolId, cb) {
    client
      .get(table)
      .where("school_id='" + schoolId + "'")
      .execute(cb);
  };

  this.getByName = function(name, cb) {
    client
      .get(table)
      .where("name='" + name + "'")
      .execute(cb);
  };

  this.getByCourseNumber = function(number, cb) {
    client
      .get(table)
      .where("course_number='" + number + "'")
      .execute(cb);
  };

  this.getByTerm = function(term, cb) {
    client
      .get(table)
      .where("term='" + term + "'")
      .execute(cb);
  };

  this.insert = function(course, cb) {
    client
      .insert(table, course, cb);
  };

  return this;
};
