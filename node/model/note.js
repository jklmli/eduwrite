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
    //get list of sessions from author
    api.createAuthorIfNotExistsFor(user_id,"default_name",function(err,author){
        if(err)
            throw err;
        cb(author);   
    });
}

exports.get_by_lecture = function(lecture,cb){
    get_by_lecture_id(lecture.id,cb);
}

exports.get_by_lecture_id = get_by_lecture_id = function(lecture_id,cb){
    api.createGroupIfNotExistsFor(lecture_id,function(err,group){
        if(err)
            throw err;
        cb(group);
    });
}

