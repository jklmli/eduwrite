var client = require("../database.js").client;
var table = "courses";


exports.get = function(id,cb){
    client.get(table).where("id='"+id+"'").limit(1).execute(cb);
}

exports.get_by_school = function(school,cb){
    client.get(table).where("school='"+school+"'").execute(cb);
}

exports.get_by_name = function(name,cb){
    client.get(table).where("name='"+name+"'").execute(cb);
}

exports.get_by_course_number = function(number,cb){
    client.get(table).where("number='"+number+"'").execute(cb);
}

exports.get_by_term = function(term,cb){
    client.get(table).where("term='"+term+"'").execute(cb);
}

exports.insert = function(course,cb){   
    client.insert(table,course,cb);
}
