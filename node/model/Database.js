var mysql = require('mysql');
var $ = require('jquery');

// Database connection information
var databaseName = "eduwrite";
var databaseHost = '107.21.246.180';
var client = mysql.createClient({
  host: databaseHost,
  database: databaseName,
  user: 'eduwrite',
  password: 'cs428cs429'
});

deferredQuery('CREATE DATABASE IF NOT EXISTS ' + databaseName)
  .then(function(){
    changeDatabase(databaseName);
  });

/**
 * Change the active database
 *  @param  newDatabaseName The name of the new database to use
 */
function changeDatabase(newDatabaseName) {
  databaseName = newDatabaseName;
  return deferredQuery('USE ' + newDatabaseName);
}

/**
 * Change the host of the database
 *  @param  newDatabaseHost The new hostname for the database
 */
function changeHost(newDatabaseHost) {
  databaseHost = newDatabaseHost;
  client = mysql.createClient({
    host: databaseHost,
    user: client.user,
    password: client.password
  });
  return deferredQuery('USE ' + databaseName);
}

function trim(str) {
  return str.replace(/^\s*|\s*$/g, '');
}

/**
 * Extends existing node-mysql connector library
 */
var Client = mysql.Client;

Client.prototype.sql = "";
/**
 * Construct a SQL statement to fetch specific columns
 *  @param select columns wanted to fetch
 */
Client.prototype.select = function(select) {
  this.sql = "select " + select + " from ";
  return this;
};

/**
 * Construct a SQL statement to choose a table
 *  @param table to use
 */
Client.prototype.from = function(table) {
  this.sql += table + " ";
  return this;
};

/**
 * Construct a SQL statement to fetch all rows of a table
 *  @param table The name of the table from which to get data
 */
Client.prototype.get = function(table) {
  this.sql = "select * from " + table + " ";
  return this;
};

/**
 * Construct a SQL statement to fetch all rows of a table
 *  @param table The name of the table from which to delete data
 */
Client.prototype.destroy = function(table) {
  this.sql = "delete from " + table + " ";
  return this;
};

/**
 * Add a where clause to the current SQL queyr
 *  @param where  The WHERE clause to add
 */
Client.prototype.where = function(where) {
  this.sql += "where " + where + " ";
  return this;
};

/**
 * Add a join clause to the current SQL query
 *  @param targetTable The targetTable of JOIN(inner) caluse
 *  @param condition The condition of JOIN(inner) clause
 */
Client.prototype.join = function(targetTable, condition) {
  this.sql += "JOIN " + targetTable + " ON " + condition + " ";
  return this;
};

/**
 * Add a limit/offset clause to the current SQL query
 *  @param limit  The limit of the number of entries to fetch
 *  @param offset The entry number with which to start fetching
 */
Client.prototype.limit = function(limit, offset) {
  offset = typeof(offset) != 'undefined' ? offset : 0;
  limit = typeof(limit) != 'undefined' ? limit : 10;
  this.sql += " limit " + offset + "," + limit + " ";
  return this;
};

/**
 *  Executes 'select' based queries
 */
Client.prototype.execute = function() {
  var q = trim(this.sql);
  console.log(q);

  return deferredQuery(q);
};

/**
 *  Helper method to insert data into the database
 */
Client.prototype.insert = function(table, obj) {
  var q = "insert into " + table + " set ";

  var values = [];
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      q += key + " = ?,";
      values.push(obj[key]);
    }
  }
  // remove dangling comma
  q = q.substring(0, q.length - 1);
  return deferredQuery(q, values);
};

/**
 *  Helper method to update existing data in the database
 */
Client.prototype.update = function(table, obj) {
  var q = "update" + table + " set ";
  var values = [];
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      query += key + " = ?, "; // FIXME: query represents a global object here
      values.push(obj[key]);
    }
  }
  // remove dangling comma
  q = q.substring(0, q.length - 1);
  return deferredQuery(q, values);
};

function deferredQuery(sql, params) {
  return $.Deferred(function() {
    // Need to save scope so we can access in callback of MySQL query
    var that = this;
    if (params === undefined) {
      params = [];
    }

    client.query(sql, params,
      function(err, results, fields) {
        if (err) {
          that.fail();
          // TODO: Should we failWith(err)?
          throw err;
        }
        else
          that.resolveWith(results);
      }
    );
  });
}

module.exports = new function() {
  var _this = this;

  this.database = databaseName;
  this.client = client;
  this.changeDatabase = changeDatabase;
  this.changeHost = changeHost;

  return this;
};
