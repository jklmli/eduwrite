var client = require("./database.js");
var user = require('./user.js');
var api = require("../db/API.js");

exports.createGroup = function(){
        api.createGroupIfNotExistsFor("-1241",function(e){
        console.log(e);
    });
};

exports.get_by_user = function(user,cb){
    if(user.aid==null){
        api.createAuthorIfNotExistsFor(user.id,user.name,function(err,response){
            if(err)
                throw err;
            aid = response.authorID;
            //TODO: update user info, and put authorID
            get_by_author_id(aid,cb);
        });
    } else {
        get_by_author_id(user.aid,cb);
    }
}

exports.get_by_author_id = get_by_author_id = function(aid,name,cb){
    //get sessions by user
    //
    

}

exports.get_by_lecture = function(lecture,cb){
    get_by_lecture_id(lecture.id,cb);
}

exports.get_by_lecture_id = get_by_lecture_id = function(lecture_id,cb){
    api.createGroupIfNotExistsFor(lecture_id,function(err,group){
        if(err)
            throw err;
        console.log(group);
    });
}

exports.setPassword = function(padID, password,cb){
    api.setPassword(padID,password,function(err,response){
        if(err)
            throw err;
        cb(response);
    })   
}
