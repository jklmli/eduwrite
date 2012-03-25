var client = require("./Database.js").client;
var Hashes = require('jshashes');
var table = "users";
var bcrypt = require('bcrypt');

/**
 *  Encrypt the password and return hash value. This is a synchronous method.
 */
var encrypt = function(password) {
  //we are using Sync method
  var salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

/**
 *  Compare password with hash from db.
 */
var comparePassword = function(password, hash) {
  return bcrypt.compareSync(password, hash);
};

module.exports = new function() {
  var _this = this;

  /**
   * Gets an element from a table in the database given its id
   *  @param id        The id of the entry to grab
   */
  this.get = function(id) {
    return client
      .get(table)
      .where("id='" + id + "'")
      .limit(1)
      .execute();
  };

  /**
   * Gets an element from a table in the database by its email
   *  @param email     The id of the entry to grab
   */
  this.getByEmail = function(email) {
    return client
      .get(table)
      .where("email='" + email + "'")
      .limit(1)
      .execute();
  };

  /**
   * Removes an element from a table in the database given its id
   *  @param id        The id of the entry to grab
   */
  this.destroy = function(id) {
    return client
      .destroy(table)
      .where("id='" + id + "'")
      .execute();
  };

  /**
   * Gets an element from a table in the database by its hashed email and password
   */
  this.getByEmailAndPassword = function(email, password) {
    return client
      .get(table)
      .where("email='" + email + "'")
      .limit(1)
      .execute()
      .pipe(function(data){
        if (data.length < 1) {
          return data;
        }
        else {
          var user = data[0];
          var pwd = user.password;
          if (comparePassword(password, pwd)) {
            return data;
          }
          else {
            return [];
          }
        }
      });
  };

  /**
   * Inserts a user into the database
   *  @param user      The user data
   */
  this.insert = function(user) {
    user.password = encrypt(user.password);
    return client
      .insert(table, user);
  };

  /**
   * Updates a user into the database
   *  @param user      The user
   */
  this.update = function(user) {
    return client
      .update(table, user)
      // FIXME: invalid SQL query modification after execution
      .where("id = " + user); //Are you sure you are not feeding in user.id ?
  };

  return this;
};

