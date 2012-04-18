var assert = require('assert');
var Note = require('../../node/model/Note.js');
var Database = require('../../node/model/Database.js');

//Change to local test database
Database.changeDatabase('testeduwrite');
Database.changeHost('localhost');

/*
 * Test get by Lecture id 
 */
describe("Note get by userId", function() {
  /*
   * Failure cases
   */
  it("should return empty array when ID not found", function(done) {
    Note.getByUserId(-1)
      .then(function(e) {
        assert.equal(0, e.length);
        done();
      });
  });

  /*
   * Pass cases
   */
  it("should return the correct result if the ID exists", function(done) {
    Note.getByUserId(0)
      .then(function(e) {
        assert.equal(2, e.length);
        done();
      });
  });
});

/*
 * Test get by lecture id
 */
describe("Note get by lecture id", function() {
  /*
   * Failure cases
   */
  it("should return empty array when lecture not found", function(done) {
    Note.getByLectureId(-1)
      .then(function(e) {
        assert.equal(0, e.length);
        done();
      });
  });

  /*
   * Pass cases
   */
  it("should return the correct result if the course id exists", function(done) {
    Note.getByLectureId(1)
      .then(function(e) {
        assert.equal(2, e.length);
        done();
      });
  });
});
