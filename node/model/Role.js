var client = require("./Database.js").client;
var table = "roles";
var relationTable = "roles_users";

module.exports = new function() {
  var _this = this;

  /**
   * Gets an element from a table in the database given its id
   *  @param id        The id of the entry to grab
   *  @param callback  The callback to perform on success
   */
  this.get = function(id, callback) {
    client
      .get(table)
      .where("id='" + id + "'")
      .limit(1)
      .execute(callback);
  };

  /**
   * Gets an role from a table in the database by its name
   *  @param name     The name of the entry to grab
   *  @param callback  The callback to perform on success
   */
  this.getByName = function(name, callback) {
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
  this.getByUser = function(user, callback) {
    _this.getByUserId(user.id, callback);
  };

  /**
   * Gets all roles that has been assgined to user with userId
   *  @param userId    The user id of user
   *  @param callback  The callback to perform on success
   */
  this.getByUserId = function(userId, callback) {
    //1. inner join user.id and relationTable.user_id
    //2. uses result from 1 to get roles
    //3. retur data
    var condition1 = relationTable + ".userId=" + userId;
    var condition2 = relationTable + ".roleId=" + table + ".id";
    var condition = condition1 + " AND " + condition2;
    client
      .get(table)
      .join(relationTable, condition)
      .execute(callback);
  };

  /**
   * Checks if user has a rolewith roleName
   *  @param userId The user id
   *  @param roleName Name of the role
   *  @return
   */
  this.hasRole = function(userId, roleName, callback) {
    _this.getByUserId(userId, function(results) {
      for (var i = 0; i < results.length; i++) {
        var role = results[i];
        if (role.name == roleName) {
          callback(true);
        }
      }
      callback(false);
    });
  };

  /**
   * Assign a role specified by name to the user
   *  @param userId   The user id of user
   *  @param callback The callback to perform on success
   */
  this.assignByRoleName = function(userId, roleName, callback) {
    _this.hasRole(userId, roleName, function(hasRole) {
      if (hasRole === true) {
        //do nothing if user already has the role
        return;
      } else {
        var roleId;
        _this.getByName(roleName, function(result) {
          if (result.length <= 0) {
            console.log("Role with roleName " + roleName + " not found in database table " + table);
          } else {
            roleId = result[0].id;
            var role_user = {roleId: roleId, userId: userId};
            client
              .insert(relationTable, role_user);
          }
        });
      }
    });
  };

  this.assignByRoleId = function(userId, roleId, callback) {

  };

  /**
   * Removes an element from a table in the database given its id
   *  @param id        The id of the entry to grab
   *  @param callback  The callback to perform on success
   */
  this.destroy = function(id, callback) {
    client
      .destroy(table)
      .where("id='" + id + "'")
      .execute(callback);
  };

  /**
   * Inserts a role into the database
   *  @param role      The role object data
   *  @param callback  The callback to perform on success
   */
  this.insert = function(role, callback) {
    client
      .insert(table, role, callback);
  };

  /**
   * Updates a role into the database
   *  @param role      The role
   *  @param callback  The callback to perform on success
   */
  this.update = function(role, callback) {
    client
      .update(table, role, callback)
      .where("id = " + user); // TODO: invalid parameter user
  };

  return this;
};
