var client = require("../database.js").client;
var table = "users";

exports.get = function(where,limit){
	client.query("select * from "+table,
	function cb(err, results, fields){
		if(err){
			throw err;
		}
		console.log(results);
		console.log(fields);
	}
	);

}
