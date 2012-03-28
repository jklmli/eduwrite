var client = require("./Database.js").client;
var table = "roles";
var relationTable = "roles_users";

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
   * Gets an role from a table in the database by its name
   *  @param name     The name of the entry to grab
   */
  this.getByName = function(name) {
    return client
      .get(table)
      .where("name='" + name + "'")
      .limit(1)
      .execute();
  };

  /**
   * Gets all roles that has been assigned to users
   *  @param user      The user object
   */
  this.getByUser = function(user) {
    return _this.getByUserId(user.id);
  };

  /**
   * Gets all roles that has been assgined to user with userId
   *  @param userId    The user id of user
   */
  this.getByUserId = function(userId) {
    //1. inner join user.id and relationTable.user_id
    //2. uses result from 1 to get roles
    //3. retur data
    var condition1 = relationTable + ".userId=" + userId;
    var condition2 = relationTable + ".roleId=" + table + ".id";
    var condition = condition1 + " AND " + condition2;

    return client
      .get(table)
      .join(relationTable, condition)
      .execute();
  };

  /**
   * Checks if user has a rolewith roleName
   *  @param userId The user id
   *  @param roleName Name of the role
   *  @return
   */
  this.hasRole = function(userId, roleName) {
    return _this.getByUserId(userId)
      .pipe(function(results) {
        var i, len, role;
        for (i = 0, len = results.length; i < len; i++) {
          role = results[i];
          if (role.name == roleName) {
            return true;
          }
        }
        return false;
      });
  };

  /**
   * Assign a role specified by name to the user
   *  @param userId   The user id of user
   */
  this.assignByRoleName = function(userId, roleName) {
    return _this.hasRole(userId, roleName)
      .pipe(function(hasRole) {
        if (hasRole === true) {
          // do nothing if user already has the role
          return
        }
        else {
          return _this.getByName(roleName)
            .pipe(function(result) {
              if (result.length <= 0) {
                console.log("Role with roleName " + roleName + " not found in database table " + table);
              } else {
                var roleId = result[0].id;
                var role_user = {roleId: roleId, userId: userId};
                return client
                  .insert(relationTable, role_user);
              }
            });
        }
      })
  };

  this.assignByRoleId = function(userId, roleId) {

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
   * Inserts a role into the database
   *  @param role      The role object data
   */
  this.insert = function(role) {
    return client
      .insert(table, role);
  };

  /**
   * Updates a role into the database
   *  @param role      The role
   */
  this.update = function(role) {
    return client
      .update(table, role)
      // FIXME: invalid parameter 'user' and SQL query modification after execution
      .where("id = " + user);
  };

  return this;
};
