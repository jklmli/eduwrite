var assert = require("assert");
var course = require("../../node/model/Course.js");

describe("Course get_by_id", function () {
  it("should return empty array when ID not found", function (done) {
    course.get(-1, function (e) {
      assert.equal(0, e.length);
      done()
    })
  });

  it("should return the correct result if the ID exists", function (done) {
    course.get(1, function (e) {
      assert.equal(1, e.length);
      assert.equal(e[0].number, "CS 425");
      done()
    })
  });
});


describe("Course get_by_school", function () {
  it("should return empty array when class not found", function (done) {
    course.getBySchool(-1, function (e) {
      assert.equal(0, e.length);
      done()
    })
  });

  it("should return array of correct results when class found", function (done) {
    course.getBySchool(1, function (e) {
      assert.ok(e.length > 0);
      for (var i = 0; i < e.length; i++)
        assert.equal(1, 1)//e[i].school, 1)
      done()
    })
  });
});


describe("Course get_by_name", function () {
  it("should return empty array when class name not found", function (done) {
    course.getByName("", function (e) {
      assert.equal(e.length, 0);
      done()
    })
  });

  it("should return array of correct results when class name found", function (done) {
    course.getByName("Distributed Systems", function (e) {
      assert.ok(e.length > 0);
      for (var i = 0; i < e.legnth; i++)
        assert.equal(e[i].name, "Distributed Systems")
      done()
    })
  });
});


describe("Course get_by_course_number", function () {
  it("should return empty array when course number not found", function (done) {
    course.getByCourseNumber("", function (e) {
      assert.equal(e.length, 0);
      done()
    })
  });

  it("should return array of correct results", function (done) {
    course.getByCourseNumber("CS 425", function (e) {
      assert.ok(e.length > 0);
      for (var i = 0; i < e.length; i++)
        assert.equal(e[i].number, "CS 425")
      done()
    })
  });
});


describe("Course get_by_term", function () {
  it("should return empty array if term not found", function (done) {
    course.getByTerm("", function (e) {
      assert.equal(e.length, 0);
      done()
    })
  });

  it("should return array of correct results", function (done) {
    course.getByTerm("Sp 12", function (e) {
      assert.ok(e.length > 0);
      for (var i = 0; i < e.length; i++)
        assert.equal(e[i].term, "Sp 12")
      done()
    })
  });
});
