var client = require("./database.js");
var user = require('./user.js');
var api = require("../db/API.js");

/*
 *  Create group ID
 */
exports.createGroup = function(groupID){
        api.createGroupIfNotExistsFor(groupID,function(e){
        console.log(e);
    });
};
/*
 * Get pads that belongs to the user.
 */
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

/*
 * Get pads that belong to the author_id of the user
 */
exports.get_by_author_id = get_by_author_id = function(aid,name,cb){
    //TODO:get sessions by user
    //TODO:get groups that the author belongs to 
    //TODO:get pads for each group
}

/*
 * Get pads that belongs to the lecture(group)
 */
exports.get_by_lecture = function(lecture,cb){
    get_by_lecture_id(lecture.id,cb);
}

/*
 * Get pads that belongs to the lecture_id(group_id)
 */
exports.get_by_lecture_id = get_by_lecture_id = function(lecture_id,cb){
    api.createGroupIfNotExistsFor(lecture_id,function(err,group){
        if(err)
            throw err;
        console.log(group);
    });
}
/*
 * Set password for the pad with padID
 */
exports.setPassword = function(padID, password,cb){
    api.setPassword(padID,password,function(err,response){
        if(err)
            throw err;
        cb(response);
    })   
}

/*
 * Create pad that does not belong to any group
 */
exports.create = function(padID, cb){
    api.createPad(padID, "", cb);
}

/*
 * Destroy pad with specific ID
 */
exports.destroy = function(padID, cb){
    api.deletePad(padID, function(err,response){
        cb(response);
    });
}
