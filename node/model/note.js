var client = require("./database.js");
var api = require("../db/API.js");

exports.createGroup = function(){
        api.createGroupIfNotExistsFor("-1241",function(e){
        console.log(e);
    });
};


exports.get_by_user = function(user,cb){
    get_by_user_id(user.id,user.name,cb);
}

exports.get_by_user_id = get_by_user_id = function(user_id,user_name,cb){
    api.createAuthorIfNotExistsFor(user_id,"user_name",cb);
}
