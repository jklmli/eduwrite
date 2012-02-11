var client = require("../database.js").client;
var Hashes = require('jshashes');
var table = "users";


var encrypt = function(password){
    //TODO:
    //  implement encryption mechanism for the password
    return password;
}

exports.get = function(id,cb){
    client.get('users').where("id='"+id+"'").limit(1).execute(cb);
}

exports.get_by_email = function(email,cb){
    client.get('users').where("email='"+email+"'").limit(1).execute(cb);
}

exports.get_by_email_and_password = function(email,password,cb){
    client.get('users').where("email='"+email+"' and password='"+encrypt(password)+"'").limit(1).execute(cb);
}

exports.insert = function(user,cb){
    client.insert('users',user,cb);
}
