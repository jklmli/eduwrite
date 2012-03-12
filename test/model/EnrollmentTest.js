var assert = require('assert');
var Enrollment = require('../../node/model/Enrollment.js');
var Database = require('../../node/model/Database.js');

// Change to local test database
Database.changeDatabase('testeduwrite');
Database.changeHost('localhost');

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

    });
  });
});

describe('Enrollment getByCourseId', function () {

  it('should return empty array if course not found');

  it('should return correct results if ID exists');

});

describe('Enrollment getByCourseAndRole', function () {

  it('should return empty array if course, role pair not found');

  it('should return correct result if exists');

});

describe('Enrollment getByCourseAndUser', function () {

  it('should return empty array if course, user not found');

  it('should return correct result if exists');

});
