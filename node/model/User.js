var client = require("./Database.js").client;
var Hashes = require('jshashes');
var table = "users";
var bcrypt = require('bcrypt');


/**
 *  Encrypt the password and return hash value. This is a synchronous method.
 */
var encrypt = function (password) {
  //we are using Sync method
  var salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};


/**
 *  Compare password with hash from db.
 */
var comparePassword = function (password, hash) {
  return bcrypt.compareSync(password, hash);
};


/**
 * Gets an element from a table in the database given its id
 *  @param id        The id of the entry to grab
 *  @param callback  The callback to perform on success
 */
exports.get = function (id, callback) {
  client
    .get(table)
    .where("id='" + id + "'")
    .limit(1)
    .execute(callback);
};


/**
 * Gets an element from a table in the database by its email
 *  @param email     The id of the entry to grab
 *  @param callback  The callback to perform on success
 */
exports.getByEmail = function (email, callback) {
  client
    .get(table)
    .where("email='" + email + "'")
    .limit(1)
    .execute(callback);
};


/**
 * Removes an element from a table in the database given its id
 *  @param id        The id of the entry to grab
 *  @param callback  The callback to perform on success
 */
exports.destroy = function (id, callback) {
  client
    .destroy(table)
    .where("id='" + id + "'")
    .execute(callback);
};


/**
 * Gets an element from a table in the database by its hashed email and password
 *  @param callback  The callback to perform on success
 */
exports.getByEmailAndPassword = function (email, password, callback) {

  client.get(table).where("email='" + email + "'").limit(1).execute(function (data) {
    if (data.length < 1) {
      callback(data);
    } else {
      var user = data[0];
      var pwd = user.password;
      if (comparePassword(password, pwd)) {
        callback(data);
      } else {
        callback([]);
      }
    }
  });
};


/**
 * Inserts a user into the database
 *  @param user      The user data
 *  @param callback  The callback to perform on success
 */
exports.insert = function (user, callback) {
  user.password = encrypt(user.password);
  client.insert(table, user, callback);
};


/**
 * Updates a user into the database
 *  @param user      The user
 *  @param callback  The callback to perform on success
 */
exports.update = function (user, callback) {
  client
    .update(table, user, callback)
    .where("id = " + user);
};
