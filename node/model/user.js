var client = require("./database.js").client;
var Hashes = require('jshashes');
var table = "users";
var bcrypt = require('bcrypt');

/**
 *  Encrypt the password and return hash value
 *  This is a sync method.
 */
var encrypt = function(password){
    //we are using Sync method
    var salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password,salt);
}

/**
 *  Compare password with hash from db.
 */
var comparePassword = function(password,hash){
    return bcrypt.compareSync(password, hash);
}

exports.get = function(id,cb){
    client.get(table).where("id='"+id+"'").limit(1).execute(cb);
}

exports.get_by_email = function(email,cb){
    client.get(table).where("email='"+email+"'").limit(1).execute(cb);
}

exports.get_by_email_and_password = function(email,password,cb){
    
    client.get(table).where("email='"+email+"'").limit(1).execute(function(e){
        if(e.length < 1){
            cb(e);
        } else {
            var user = e[0];
            var pwd = user.password;
            if(comparePassword(password,pwd)){
                cb(e);
            } else {
                cb([]);
            }
        }
    });

}

exports.insert = function(user,cb){
    user.password = encrypt(user.password);
    client.insert(table,user,cb);
}
