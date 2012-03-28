var assert = require('assert');
var Lecture = require('../../node/model/Lecture.js');
var Database = require('../../node/model/Database.js');

//Change to local test database
Database.changeDatabase('testeduwrite');
Database.changeHost('localhost');

/*
 * Test get by Lecture id 
 */
describe("Lecture get by id", function() {
  /*
   * Failure cases
   */
  it("should return empty array when ID not found", function(done) {
    Lecture.get(-1)
      .then(function(e) {
        assert.equal(0, e.length);
        done()
      })
  });

  /*
   * Pass cases
   */
  it("should return the correct result if the ID exists", function(done) {
    Lecture.get(1)
      .then(function(e) {
        assert.equal(1, e.length);
        done()
      })
  });
});

/*
 * Test get by course id
 */
describe("Lecture get by course id", function() {
  /*
   * Failure cases
   */
  it("should return empty array when course not found", function(done) {
    Lecture.getByCourseId(-1)
      .then(function(e) {
        assert.equal(0, e.length);
        done()
      })
  });

  /*
   * Pass cases
   */
  it("should return the correct result if the course id exists", function(done) {
    Lecture.getByCourseId(2)
      .then(function(e) {
        assert.equal(2, e.length);
        done()
      })
  });
});

/*
 * Test get Lecture by date
 */
describe("Lecture get by date", function() {
  /*
   * Failure cases
   */
  it("should return empty array when no Lecture occured on date", function(done) {
    Lecture.getByDate('2011-12-05')
      .then(function(e) {
        assert.equal(0, e.length);
        done()
      })
  });

  /*
   * Pass cases
   */
  it("should return the correct result if a Lecture on the date exists", function(done) {
    Lecture.getByDate('2012-03-05')
      .then(function(e) {
        assert.equal(1, e.length);
        done()
      })
  });
});
