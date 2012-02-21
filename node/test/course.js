var assert = require("assert");
var course = require("../model/user.js")

var count = 0;

var testFailGetByID = course.get(-1, function(e){
	try {
		assert.equal(0, e.length)
		console.log("Passed invalid id test")
	}
	catch(err) {
		console.log(err);
	}
});

var testlGetByID = course.get(2, function(e){
	try {
		assert.equal(1, e.length)
		//TODO: confirm entry matches one in DB
		console.log("Passed real id test")
	}
	catch(err) {
		console.log(err);
	}
});

exports.test = test;
