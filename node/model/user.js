var client = require("../database.js").client;
var Hashes = require('jshashes');
var table = "users";
var bcrypt = require('bcrypt');

/**
 *  Encrypt the password and return hash value
 *  This is a sync method.
 */
var encrypt = function(password){
    var salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password,salt);
}

/**
 *  Compare password with hash from db.
 */
var comparePassword = function(password,hash){
    return bcrypt.compare(password, hash);
}

exports.get = function(id,cb){
    client.get('users').where("id='"+id+"'").limit(1).execute(cb);
}

exports.get_by_email = function(email,cb){
    client.get('users').where("email='"+email+"'").limit(1).execute(cb);
}

exports.get_by_email_and_password = function(email,password,cb){

    client.get('users').where("email='"+email+"' and password='"+comparePassword(password)+"'").limit(1).execute(cb);
}

exports.insert = function(user,cb){
    user.password = encrypt(user.password);
    client.insert('users',user,cb);
}
