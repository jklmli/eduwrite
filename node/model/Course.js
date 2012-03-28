/*
 * Course.js
 * DB model for courses
 */
 
var client = require("./Database.js").client;
var table = "courses";

module.exports = new function() {
  var _this = this;

  /**
   *  Retrive course by ID
   *  @param id the unique id number of the course
   */
  this.get = function(id) {
    return client
      .get(table)
      .where("id='" + id + "'")
      .limit(1)
      .execute();
  };

  /**
   *  Retrive course by school id
   *  @param schoolId unique id number for the school
   */
  this.getBySchoolId = function(schoolId) {
    return client
      .get(table)
      .where("schoolId='" + schoolId + "'")
      .execute();
  };

  /**
   *  Retrive course by the name of the course
   *  @param name a substring of the course title
   */
  this.getByName = function(name) {
    return client
      .get(table)
      .where("name like '" + name + "'")
      .execute();
  };

  /**
   *  Retrive course by the number of the course
   *  @param number the integer number of the course
   */
  this.getByNumber = function(number) {
    return client
      .get(table)
      .where("number=" + number)
      .execute();
  };
  
  /**
   *  Retrive course by the department abbreviation
   *  @param department string abbreviation of the department
   */
  this.getByDepartment = function(department) {
    return client
      .get(table)
      .where("department='" + department + "'")
      .execute();
  };
  
  /**
   *  Retrive course by the department abbreviation and course number
   *  @param department string abbreviation of department
   *  @param number integer number of the course
   */
  this.getByCourseNumber = function(department, number) {
    return client
      .get(table)
      .where("department='" + department + "' and number =" + number)
      .execute();
  };
  
  /**
   *  Retrive course by the year and semester
   *  @param year integer year course was offered
   *  @param semester enum of ('Fall', 'Spring')
   */
  this.getByTerm = function(year, semester) {
    return client
      .get(table)
      .where("year=" + year + " and semester ='" + semester + "'")
      .execute();
  };
  
  /**
   *  Retrive course by the year
   *  @param year integer year course was offered
   */
  this.getByYear = function(year) {
    return client
      .get(table)
      .where("year=" + year)
      .execute();
  };
  
  /**
   *  Retrive course by the semester
   *  @param semester enum of ('Fall', 'Spring')
   */
  this.getByTerm = function(semester) {
    return client
      .get(table)
      .where("semester='" + semester + "'")
      .execute();
  };
  
  /**
   *  Insert a new course into the database
   *  @param course course object
   */
  this.insert = function(course) {
    return client
      .insert(table, course);
  };

  return this;
};
