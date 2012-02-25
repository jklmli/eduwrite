var client = require("./database.js");
var authorManager = require("../db/AuthorManager.js");
var groupManager = require("../db/GroupManager.js");

exports.createGroup = function(){
        groupManager.createGroupIfNotExistsFor("-1241",function(e){
        console.log(e);
    });
};


exports.get_by_user = function(user,cb){
    get_by_user_id(user.id,cb);
}

exports.get_by_user_id = get_by_user_id = function(user_id,cb){
    authorManager.createAuthorIfNotExistsFor(user_id,cb);
}


var cb = function(e){
    console.log(e);   
}

