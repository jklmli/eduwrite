var mysql = require('mysql');
var database = "eduwrite"
var client = mysql.createClient({
  host: '107.21.246.180',
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

Client.prototype.destroy = function(table){
    this.sql = "delete from "+table;
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




/*
 *  Excutes 'select' based queries
 */
Client.prototype.execute = function(cb){
    var q = this.sql;
    client.query(q,returnResult(cb));
}


/*
 *  Helper method to insert data into the database
 */
Client.prototype.insert = function(table, obj,cb){
    var q = "insert into "+table+" set ";

    var values = [];
    for(var key in obj){
        q+=key+" = ?,"
        values.push(obj[key]);
    }
    //remove last comma
    q = q.substring(0,q.length-1);
    client.query(q,values,returnResult(cb));
}

/*
 *  Helper method to update existing data in the database
 */
 Client.prototype.update = function(table, obj, cb) {
	 var q = "update" + table + " set ";
	 var values = [];
	 for(var key in obj) {
		query += key + " = ?, ";
		values.push(obj[key]);
	 }
	 //remove the dangling comma
	 q = q.substring(0, q.length-1);
	 client.query(q, values, returnResult(cb));
 }


/*
 * General function that will feed eturn data from database
 * to the callback method provided
 */
var returnResult = function(cb){
    return function(err,results,fields){
        if(err){
            throw err;
        }
        if(cb){
            cb(results);
        }
    }
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
