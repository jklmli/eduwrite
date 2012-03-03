var client = require("./Database.js");
var user = require('./User.js');
var api = require("../db/API.js");


/**
 *  Create group ID
 */
exports.createGroup = function (groupID) {
  api.createGroupIfNotExistsFor(groupID, function (e) {
    console.log(e);
  });
};


/**
 * Get pads that belongs to the user.
 */
exports.getByUser = function (user, callback) {
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
};


/**
 * Get pads that belong to the author_id of the user
 */
exports.getByAuthorId = getByAuthorId = function getByAuthorId(aid, name, callback) {
  //TODO:get sessions by user
  //get groups that the author belongs to
  //get pads for each group
};


/**
 * Get pads that belongs to the lecture(group)
 */
exports.getByLecture = getByLecture = function getByLecture(lecture, callback) {
  getByLectureId(lecture.id, callback);
};


/**
 * Get pads that belongs to the lecture_id(group_id)
 */
exports.getByLectureId = getByLectureId = function (lecture_id, callback) {
  api.createGroupIfNotExistsFor(lecture_id, function (error, group) {
    if (error)
      throw error;
    console.log(group);
  });
};


/**
 * Set password for the pad with padID
 */
exports.setPassword = function (padID, password, cb) {
  api.setPassword(padID, password, function (err, response) {
    if (err)
      throw err;
    cb(response);
  })
};


/**
 * Create pad that does not belong to any group
 */
exports.create = function (padID, callback) {
  api.createPad(padID, "", callback);
};


/**
 * Destroy pad with specific ID
 */
exports.destroy = function (padID, callback) {
  api.deletePad(padID, function (err, response) {
    callback(response);
  });
};
