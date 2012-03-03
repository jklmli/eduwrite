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
  assert.equal(actualCourse.id, expectedCourse.id);
  assert.equal(actualCourse.school_id, expectedCourse.school_id);
  assert.equal(actualCourse.name, expectedCourse.name);
  assert.equal(actualCourse.term, expectedCourse.term);
  assert.equal(actualCourse.course_number, expectedCourse.course_number);
}


/**
 * Test that Course.getById
 */
describe('Course getById', function () {

  it('should return empty array when ID not found', function (done) {
    Course.get(6, function (courseData) {
      assert.equal(0, courseData.length);
      done()
    })
  });

  it('should return the correct result if the ID exists', function (done) {
    Course.get(1, function (courseData) {
      
      // Prepare the expected data
      var expectedCourse = {
        id: 1,
        school_id: 1,
        term: 'Spring 2012',
        name: 'Distributed Systems',
        course_number: 'CS 425'
      };

      // Check that we found exactly one course, and that it's the course we expected
      assert.equal(1, courseData.length);
      var course = courseData[0];
      assertCoursesEqual(course, expectedCourse);

      done()

    });
  });
});

//
//describe('Course get_by_school', function () {
//  it('should return empty array when class not found', function (done) {
//    course.getBySchool(-1, function (e) {
//      assert.equal(0, e.length);
//      done()
//    })
//  });
//
//  it('should return array of correct results when class found', function (done) {
//    course.getBySchool(1, function (e) {
//      assert.ok(e.length > 0);
//      for (var i = 0; i < e.length; i++)
//        assert.equal(1, 1)//e[i].school, 1)
//      done()
//    })
//  });
//});
//
//
//describe('Course get_by_name', function () {
//  it('should return empty array when class name not found', function (done) {
//    course.getByName('', function (e) {
//      assert.equal(e.length, 0);
//      done()
//    })
//  });
//
//  it('should return array of correct results when class name found', function (done) {
//    course.getByName('Distributed Systems', function (e) {
//      assert.ok(e.length > 0);
//      for (var i = 0; i < e.legnth; i++)
//        assert.equal(e[i].name, 'Distributed Systems')
//      done()
//    })
//  });
//});
//
//
//describe('Course get_by_course_number', function () {
//  it('should return empty array when course number not found', function (done) {
//    course.getByCourseNumber('', function (e) {
//      assert.equal(e.length, 0);
//      done()
//    })
//  });
//
//  it('should return array of correct results', function (done) {
//    course.getByCourseNumber('CS 425', function (e) {
//      assert.ok(e.length > 0);
//      for (var i = 0; i < e.length; i++)
//        assert.equal(e[i].number, 'CS 425')
//      done()
//    })
//  });
//});
//
//
//describe('Course get_by_term', function () {
//  it('should return empty array if term not found', function (done) {
//    course.getByTerm('', function (e) {
//      assert.equal(e.length, 0);
//      done()
//    })
//  });
//
//  it('should return array of correct results', function (done) {
//    course.getByTerm('Sp 12', function (e) {
//      assert.ok(e.length > 0);
//      for (var i = 0; i < e.length; i++)
//        assert.equal(e[i].term, 'Sp 12')
//      done()
//    })
//  });
//});
