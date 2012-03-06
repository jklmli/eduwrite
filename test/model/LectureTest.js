var assert = require("assert");
var lecture = require("../../node/model/Lecture.js");

/**
 * ANDREW: Just uncomment these tests and make them use the test database
 */

/*
 * Test get by lecture id 
 */
//describe("Lecture get by id", function () {
//  /*
//   * Failure cases
//   */
//  it("should return empty array when ID not found", function (done) {
//    lecture.get(-1, function (e) {
//      assert.equal(0, e.length);
//      done()
//    })
//  });
//
//  /*
//   * Pass cases
//   */
//  it("should return the correct result if the ID exists", function (done) {
//    lecture.get(7, function (e) {
//      assert.equal(1, e.length);
//      done()
//    })
//  });
//});
//
///*
// * Test get by course id
// */
//describe("Lecture get by course id", function () {
//  /*
//   * Failure cases
//   */
//  it("should return empty array when course not found", function (done) {
//    lecture.get(-1, function (e) {
//      assert.equal(0, e.length);
//      done()
//    })
//  });
//
//  /*
//   * Pass cases
//   */
//  it("should return the correct result if the course id exists", function (done) {
//    lecture.get(2, function (e) {
//      assert.equal(2, e.length);
//      done()
//    })
//  });
//});
//
///*
// * Test get lecture by date
// */
//describe("Lecture get by date", function () {
//  /*
//   * Failure cases
//   */
//  it("should return empty array when no lecture occured on date", function (done) {
//    lecture.get('2011-12-05', function (e) {
//      assert.equal(0, e.length);
//      done()
//    })
//  });
//
//  /*
//   * Pass cases
//   */
//  it("should return the correct result if a lecture on the date exists", function (done) {
//    lecture.get('2012-03-05', function (e) {
//      assert.equal(1, e.length);
//      done()
//    })
//  });
//});