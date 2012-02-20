var client = require("./database.js");
var db = require("../db/DB.js");
db.init(console.log("success"));
console.log(db.db);
var authorManager = require("../db/AuthorManager.js");
console.log(db.db);
exports.get_by_user = function(user,cb){
    get_by_user_id(user.id,cb);
}

exports.get_by_user_id = get_by_user_id = function(user_id,cb){
    authorManager.createAuthorIfNotExistsFor(user_id,cb);
}


var cb = function(e){
    console.log(e);   
}

