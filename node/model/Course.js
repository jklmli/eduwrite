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
      .where("schoolId='" + schoolId + "'")
      .execute();
  };

  this.getByName = function(name) {
    return client
      .get(table)
      .where("name='" + name + "'")
      .execute();
  };

  this.getByNumber = function(number) {
    return client
      .get(table)
      .where("number=" + number)
      .execute();
  };
  
  this.getByDepartment = function(department) {
    return client
      .get(table)
      .where("department='" + department + "'")
      .execute();
  };
  
  this.getByCourseNumber = function(department, number) {
    return client
      .get(table)
      .where("department='" + department + "' and number =" + number)
      .execute();
  };
  
  this.getByTerm = function(year, semester) {
    return client
      .get(table)
      .where("year=" + year + " and semester ='" + semester + "'")
      .execute();
  };

  this.insert = function(course) {
    return client
      .insert(table, course);
  };

  return this;
};
