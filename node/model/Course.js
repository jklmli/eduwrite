var client = require("./Database.js").client;
var table = "courses";

module.exports = {
  get:function (id, cb) {
    client
      .get(table)
      .where("id='" + id + "'")
      .limit(1)
      .execute(cb);
  },

  getBySchoolId:function (schoolId, cb) {
    client
      .get(table)
      .where("school_id='" + schoolId + "'")
      .execute(cb);
  },

  getByName:function (name, cb) {
    client
      .get(table)
      .where("name='" + name + "'")
      .execute(cb);
  },

  getByCourseNumber:function (number, cb) {
    client
      .get(table)
      .where("course_number='" + number + "'")
      .execute(cb);
  },

  getByTerm:function (term, cb) {
    client
      .get(table)
      .where("term='" + term + "'")
      .execute(cb);
  },

  insert:function (course, cb) {
    client
      .insert(table, course, cb);
  }
};
