var client = require("./Database.js").client;
var table = "roles";
var relationTable = "roles_users";


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
exports.getByName = function (name, callback) {
  client
    .get(table)
    .where("name='" + name + "'")
    .limit(1)
    .execute(callback);
};

/**
 * Gets all roles that has been assigned to users
 *  @param user      The user object
 *  @param callback  The callback to perform on success
 */
exports.getByUser = function (user, callback){
  getByUserId(user.id,callback);
}

/**
 * Gets all roles that has been assgined to user with userId
 *  @param userId    The user id of user
 *  @param callback  The callback to perform on success
 */
exports.getByUserId = getByUserId = function(userId, callback){
    //TODO:left join roles and roles_users
    
}


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
 * Inserts a user into the database
 *  @param user      The user data
 *  @param callback  The callback to perform on success
 */
exports.insert = function (role, callback) {
  client.insert(table, role, callback);
};


/**
 * Updates a user into the database
 *  @param user      The user
 *  @param callback  The callback to perform on success
 */
exports.update = function (role, callback) {
  client
    .update(table, role, callback)
    .where("id = " + user);
};
