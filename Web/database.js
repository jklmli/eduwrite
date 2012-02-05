var mysql = require('mysql');
var database = "eduwrite"
var client = mysql.createClient({
  user: 'eduwrite',
  password: 'cs428cs429',
});


/**
 *
 * Extends existing node-mysql connector library
 *
 */
var Client = mysql.Client;
Client.prototype.sql = "";
Client.prototype.get = function(table){
    this.sql = "select * from "+table;
    return this;
}

Client.prototype.where = function(where){
    this.sql+= " where "+where;
    return this;
}

Client.prototype.limit = function(limit,offset){
    offset = typeof(offset) != 'undefined' ? offset : 0;
    limit = typeof(limit) != 'undefined' ? limit : 10;
    this.sql+= " limit "+offset+","+limit;
    return this;
}

Client.prototype.execute = function(cb){
    var q = this.sql;
    client.query(q,function(err,results){
        if(err){
            throw err;
        }
        if(cb){
            cb(results);
        }
    });
}

client.query('USE '+database);
//create database if it does not exists
client.query('CREATE DATABASE '+database, function(err) {
  if (err && err.number != mysql.ERROR_DB_CREATE_EXISTS) {
    throw err;
  }
});

//example
/*
var results = client.get('users').limit(1).execute(function(results){
    console.log(results);
});
*/






exports.database = database;
exports.client = client;
