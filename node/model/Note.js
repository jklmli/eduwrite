var client = require("./Database.js").client;
var user = require('./User.js');
var api = require("../db/API.js");
var table = "notes";

module.exports = {
  /**
   * Get notes that belongs to the user.
   */
  getByUser: function (user, callback) {
    this.getByUserId(user.id, callback);
  },

  getByUserId: function (user_id, callback) {
    client
      .get(table)
      .where("user_id='" + user.id + "'")
      .limit(30)
      .execute(callback);
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
  },

  /**
   * Get pads that belongs to the lecture_id(group_id)
   */
  getByLectureId: function (lecture_id, callback) {
    client
      .get(table)
      .where("lecture_id='" + lecture_id + "'")
      .limit(30)
      .execute(callback);

    /*
     api.createGroupIfNotExistsFor(lecture_id, function (error, group) {
     if (error)
     throw error;
     console.log(group);
     });
     */
  },

  /**
   *  Create group with groupID
   */
  createGroup: function (groupID) {
    api.createGroupIfNotExistsFor(groupID, function (e) {
      console.log(e);
    });
  },

  /**
   * Get pads that belong to the author_id of the user
   */
  getByAuthorId: function (aid, name, callback) {
    //TODO:get sessions by user
    //get groups that the author belongs to
    //get pads for each group
  },

  /**
   * Get pads that belongs to the lecture(group)
   */
  getByLecture: function (lecture, callback) {
    this.getByLectureId(lecture.id, callback);
  },

  /**
   * Set password for the pad with padID
   */
  setPassword: function (padID, password, cb) {
    api.setPassword(padID, password, function (err, response) {
      if (err)
        throw err;
      cb(response);
    })
  },

  /**
   * Create pad that does not belong to any group
   */
  create: function (user_id, lecture_id, callback) {
    var note = {user_id: user_id, lecture_id: lecture_id};
    client.insert(table, note, function (e) {
      console.log(e);
    });

    //api.createPad(padID, "", function(err,response){

    //});
  },

  /**
   * Destroy pad with specific ID
   */
  destroy: function (padID, callback) {
    api.deletePad(padID, function (err, response) {
      callback(response);
    });
  }
};
