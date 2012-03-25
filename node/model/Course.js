var client = require("./Database.js").client;
var table = "courses";

module.exports = new function() {
  var _this = this;

  this.get = function(id) {
    return client
      .get(table)
      .where("id='" + id + "'")
      .limit(1)
      .execute();
  };

  this.getBySchoolId = function(schoolId) {
    return client
      .get(table)
      .where("school_id='" + schoolId + "'")
      .execute();
  };

  this.getByName = function(name) {
    return client
      .get(table)
      .where("name='" + name + "'")
      .execute();
  };

  this.getByCourseNumber = function(number) {
    return client
      .get(table)
      .where("course_number='" + number + "'")
      .execute();
  };

  this.getByTerm = function(term) {
    return client
      .get(table)
      .where("term='" + term + "'")
      .execute();
  };

  this.insert = function(course) {
    return client
      .insert(table, course);
  };

  return this;
};
