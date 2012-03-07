var client = require("./Database.js").client;
var table = "courses";


exports.get = function (id, cb) {
  client
    .get(table)
    .where("id='" + id + "'")
    .limit(1)
    .execute(cb);
};



//exports.get_by_id = get; //for Janaki

exports.getBySchoolId = function (schoolId, cb) {
  client
    .get(table)
    .where("school_id='" + schoolId + "'")
    .execute(cb);
};


exports.getByName = function (name, cb) {
  client
    .get(table)
    .where("name='" + name + "'")
    .execute(cb);
};


exports.getByCourseNumber = function (number, cb) {
  client
    .get(table)
    .where("course_number='" + number + "'")
    .execute(cb);
};


exports.getByTerm = function (term, cb) {
  client
    .get(table)
    .where("term='" + term + "'")
    .execute(cb);
};


exports.insert = function (course, cb) {
  client
    .insert(table, course, cb);
};
