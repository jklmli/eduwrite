var client = require("./Database.js").client;
var table = "courses";

module.exports = new function() {
  var _this = this;

  this.get = function(id) {
    client
      .get(table)
      .where("id='" + id + "'")
      .limit(1)
      .execute();
  };

  this.getBySchoolId = function(schoolId) {
    client
      .get(table)
      .where("school_id='" + schoolId + "'")
      .execute();
  };

  this.getByName = function(name) {
    client
      .get(table)
      .where("name='" + name + "'")
      .execute();
  };

  this.getByCourseNumber = function(number) {
    client
      .get(table)
      .where("course_number='" + number + "'")
      .execute();
  };

  this.getByTerm = function(term) {
    client
      .get(table)
      .where("term='" + term + "'")
      .execute();
  };

  this.insert = function(course) {
    client
      .insert(table, course);
  };

  return this;
};
