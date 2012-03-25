var client = require("./Database.js").client;
var user = require('./User.js');
var api = require("../db/API.js");
var table = "notes";

module.exports = new function() {
  var _this = this;

  /**
   * Get notes that belongs to the user.
   */
  this.getByUser = function(user) {
    _this.getByUserId(user.id);
  };

  this.getByUserId = function(user_id) {
    client
      .get(table)
      .where("user_id='" + user.id + "'")
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
   */
  this.getByLectureId = function(lecture_id) {
    client
      .get(table)
      .where("lecture_id='" + lecture_id + "'")
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
  this.createGroup = function(groupID) {
    api.createGroupIfNotExistsFor(groupID, function(e) {
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
    _this.getByLectureId(lecture.id);
  };

  /**
   * Set password for the pad with padID
   */
  this.setPassword = function(padID, password, cb) {
    api.setPassword(padID, password, function(err, response) {
      if (err)
        throw err;
      cb(response);
    })
  };

  /**
   * Create pad that does not belong to any group
   */
  this.create = function(user_id, lecture_id) {
    var note = {user_id: user_id, lecture_id: lecture_id};
    client.insert(table, note);

    //api.createPad(padID, "", function(err,response){

    //});
  };

  /**
   * Destroy pad with specific ID
   */
  this.destroy = function(padID, callback) {
    api.deletePad(padID, function(err, response) {
      callback(response);
    });
  };

  return this;
};
