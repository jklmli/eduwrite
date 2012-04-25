var assert = require('assert');
var Course = require('../../node/model/Course.js');
var Database = require('../../node/model/Database.js');

// Change to local test database
Database.changeDatabase('testeduwrite');
Database.changeHost('localhost');


/**
 * Helper function to check that two courses are equal
 *  @param actualCourse   The actual course
 *  @param expectedCourse The course expected
 */
function assertCoursesEqual(actualCourse, expectedCourse) {
  assert.equal(typeof(actualCourse), typeof(expectedCourse));
  assert.equal(actualCourse.id, expectedCourse.id);
  assert.equal(actualCourse.schoolId, expectedCourse.schoolId);
  assert.equal(actualCourse.name, expectedCourse.name);
  assert.equal(actualCourse.term, expectedCourse.term);
  assert.equal(actualCourse.department, expectedCourse.department);
  assert.equal(actualCourse.number, expectedCourse.number);
}


// Sample data
var distributedSystemsCourse = {
  id: 1,
  schoolId: 1,
  semester: 'Spring',
  year: '2012',
  name: 'Distributed Systems',
  department: 'CS',
  number: 425
};


/**
 * Test that Course.getById
 */
describe('Course getById', function() {

  it('should return empty array when ID not found', function(done) {
    Course.get(6)
      .then(function(courseData) {
        // Check that no course was found
        assert.equal(0, courseData.length);
        done();
      });
  });

  it('should return the correct result if the ID exists', function(done) {
    Course.get(1)
      .then(function(courseData) {

        // Check that we found exactly one course, and that it's the course we expected
        assert.equal(1, courseData.length);
        var course = courseData[0];
        assertCoursesEqual(course, distributedSystemsCourse);
        done();

      });
  });
});


/**
 * Check that Course.getBySchoolId behaves correctly
 */
describe('Course getBySchoolId', function() {

  it('should return empty array when class not found', function(done) {
    Course.getBySchoolId(-1)
      .then(function(courseData) {

        // Check that no courses were found
        assert.equal(0, courseData.length);
        done();

      });
  });

  it('should return array of correct results when class found', function(done) {
    Course.getBySchoolId(1)
      .then(function(courseData) {

        // Check that courses were returned, and that
        assert.ok(courseData.length > 0);
        for (var i = 0; i < courseData.length; i++) {
          assert.equal(courseData[i].schoolId, 1);
        }
        done();

      });
  });
});


/**
 * Check that Course.getByName behaves correctly
 */
describe('Course getByName', function() {

  it('should return empty array when class name not found', function(done) {
    Course.getByName('someCourseNameThatDoesntExist')
      .then(function(courseData) {

        // Check that no courses were found
        assert.equal(courseData.length, 0);
        done();

      });
  });

  it('should return array of correct results when class name found', function(done) {
    Course.getByName('Distributed Systems')
      .then(function(courseData) {

        // Check that the correct course was found
        assert.ok(courseData.length === 1);
        assertCoursesEqual(courseData[0], distributedSystemsCourse);
        done();

      });
  });
});


/**
 * Test that Course.getByCourseNumber behaves correctly
 */
describe('Course getByCourseNumber', function() {

  it('should return empty array when course number not found', function(done) {
    Course.getByCourseNumber('blargh', 101)
      .then(function(courseData) {

        // Check that no corresponding course data was found
        assert.equal(courseData.length, 0);
        done();

      });
  });

  it('should return array of correct results', function(done) {
    Course.getByCourseNumber(distributedSystemsCourse.department, distributedSystemsCourse.number)
      .then(function(courseData) {

        // Check that we found the course
        assert.ok(courseData.length > 0);
        assertCoursesEqual(courseData[0], distributedSystemsCourse);
        done();

      });
  });
});


/**
 * Check that Course.getByTerm works behaves correctly
 */
describe('Course getByTerm', function() {

  it('should return empty array if term not found', function(done) {
    Course.getByTerm(2001, 'Spring')
      .then(function(courseData) {

        // Check that no course was found
        assert.equal(courseData.length, 0);
        done();

      });
  });

  it('should return array of correct results', function(done) {
    Course.getByTerm(2012, 'Spring')
      .then(function(courseData) {

        // Check that some correct course data was returned
        assert.ok(courseData.length > 0);
        for (var i = 0; i < courseData.length; i++) {
          assert.equal(courseData[i].year, 2012);
          assert.equal(courseData[i].semester, 'Spring');
        }
        done();

      });
  });
});
