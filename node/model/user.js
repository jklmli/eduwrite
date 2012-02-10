var client = require("../database.js").client;
var Hashes = require('jshashes');
var table = "users";
var get = client.get('users');

exports.get = function(id,cb){
    get.where("id='"+id+"'").limit(1).execute(
        function(e){
            cb(e);
        }
    );
}

exports.get_by_email = function(email,cb){
    get.where("email='"+email+"'").limit(1).execute(
        function(e){
            cb(e);
        }
    );
}
