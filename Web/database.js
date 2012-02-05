var mysql = require('mysql');
var database = "eduwrite"
var client = mysql.createClient({
  user: 'eduwrite',
  password: 'cs428cs429',
});


//create database if it does not exists
client.query('CREATE DATABASE '+database, function(err) {
  if (err && err.number != mysql.ERROR_DB_CREATE_EXISTS) {
    throw err;
  }
});

client.query('USE '+database);

//write setup scripts here

client.query(
  'CREATE TABLE IF NOT EXISTS users '+
  '(id INT(11) AUTO_INCREMENT, '+
  'title VARCHAR(255), '+
  'text TEXT, '+
  'created DATETIME, '+
  'PRIMARY KEY (id))'
);





exports.database = database;
exports.client = client;
