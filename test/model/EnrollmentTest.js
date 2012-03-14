var assert = require('assert');
var Enrollment = require('../../node/model/Enrollment.js');
var Database = require('../../node/model/Database.js');

// Change to local test database
Database.changeDatabase('testeduwrite');
Database.changeHost('localhost');

/**
 *  Test Enrollment.get(id, callback)
 */
describe('Enrollment get', function () {

  it('should return empty array when ID not found', function (done) {
    Enrollment.get(5, function (enrollmentData) {

      assert.equal(0, enrollmentData.length);
      done();

    });
  });

  it('should return correct result if ID exists', function (done) {
    Enrollment.get(2, function (enrollmentData) {

      assert.equal(1, enrollmentData.length);
      assert.equal(2, enrollmentData[0].student_id);
      done();

    });
  });
});

/**
 *  Test Enrollment.getByCourseId(courseId, callback)
 */
describe('Enrollment getByCourseId', function () {

  it('should return empty array if course not found', function (done) {
    Enrollment.getByCourseId(3, function (enrollmentData) {

      assert.equal(0, enrollmentData.length);
      done();

    });
  });

  it('should return correct results if ID exists', function (done) {
    Enrollment.getByCourseId(1, function (enrollmentData) {

      assert.equal(2, enrollmentData.length);
      assert.equal(1, enrollmentData[0].id);
      assert.equal(2, enrollmentData[1].id);
      done();

    });
  });

});

/**
 *  Test Enrollment.getByCourseAndRole(CourseId, role, callback)
 */
describe('Enrollment getByCourseAndRole', function () {

  it('should return empty array if course, role pair not found', function (done) {
    Enrollment.getByCourseAndRole(2, 'Student', function (enrollmentData) {

      assert.equal(0, enrollmentData.length);
      done();

    });
  });

  it('should return correct result if exists', function (done) {
    Enrollment.getByCourseAndRole(1, 'student', function (enrollmentData) {
      
      assert.equal(1, enrollmentData.length);
      assert.equal(1, enrollmentData[0].id);
      done();

    });
  });

});

/**
 *  Test Enrollment.getByCourseAndUser(courseId, studentId, callback)
 */
describe('Enrollment getByCourseAndUser', function () {

  it('should return empty array if course, user not found', function (done) {
    Enrollment.getByCourseAndUser(2, 2, function (enrollmentData) {

      assert.equal(0, enrollmentData.length);
      done();

    });
  });

  it('should return correct result if exists', function (done) {
    Enrollment.getByCourseAndUser(1, 1, function (enrollmentData) {

      assert.equal(1, enrollmentData.length);
      assert.equal(1, enrollmentData[0].id);
      done();

    });
  });

});
