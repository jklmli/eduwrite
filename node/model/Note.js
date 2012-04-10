/**
 * Note.js
 * Model for Notes for different user and classes
 */

var client = require("./Database.js").client;
var user = require('./User.js');
var api = require("../db/API.js");
var table = "notes";

module.exports = new function() {
  var _this = this;

  /**
   * Get notes that belongs to the user
   * @param user User object
   */
  this.getByUser = function(user) {
    return _this.getByUserId(user.id);
  };

  /*
   * Get most recent 30 notes by user
   * @param userId unique id of the user
   */
  this.getByUserId = function(userId) {
    return client
      .get(table)
      .where("userId='" + userId + "'")
      .limit(30)
      .execute();
    /*
     * Will be used later
     *
     if (user.aid == null) {
     api.createAuthorIfNotExistsFor(user.id, user.name, function (err, response) {
     if (err)
     throw err;
     aid = response.authorID;
     //TODO: update user info, and put authorID
     getByAuthorId(aid, callback);
     });
     } else {
     getByAuthorId(user.aid, callback);
     }
     */
  };

  /**
   * Get pads that belongs to the lecture_id(group_id)
   * @param lectureId the unique id of the lecture
   */
  this.getByLectureId = function(lectureId) {
    return client
      .get(table)
      .where("lectureId='" + lectureId + "'")
      .limit(30)
      .execute();

    /*
     api.createGroupIfNotExistsFor(lecture_id, function (error, group) {
     if (error)
     throw error;
     console.log(group);
     });
     */
  };

  /**
   *  Create group with groupID
   */
  this.createGroup = function(groupId) {
    api.createGroupIfNotExistsFor(groupId, function(e) {
      console.log(e);
    });
  };

  /**
   * Get pads that belong to the author_id of the user
   */
  this.getByAuthorId = function(aid, name) {
    //TODO:get sessions by user
    //get groups that the author belongs to
    //get pads for each group
  };

  /**
   * Get pads that belongs to the lecture(group)
   */
  this.getByLecture = function(lecture) {
    return _this.getByLectureId(lecture.id);
  };

  /**
   * Set password for the pad with padID
   */
  this.setPassword = function(padId, password, cb) {
    api.setPassword(padId, password, function(err, response) {
      if (err)
        throw err;
      cb(response);
    })
  };

  /**
   * Create pad that does not belong to any group
   */
  this.create = function(userId, lectureId, title) {
    var note = {userId: userId, lectureId: lectureId, title: title};
    return client.insert(table, note);

    //api.createPad(padID, "", function(err,response){

    //});
  };

  /**
   * Destroy pad with specific ID
   */
  this.destroy = function(padId, callback) {
    api.deletePad(padId, function(err, response) {
      callback(response);
    });
  };

  return this;
};
