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

var testGetByID = course.get(1, function(e){
	try {
		assert.equal(1, e.length)
		assert.equal(e[0].number, "CS 425")
		console.log("Passed valid id test")
	}
	catch(err) {
		console.log(err);
	}
});

var testFailGetBySchool = course.get_by_school(-1, function(e){
	try {
		assert.equal(0, e.length)
		console.log("Passed invalid school test")
	}
	catch(err) {
		console.log(err)
	}
});

var testGetBySchool = course.get_by_school(1, function(e){
	try {
		assert.ok(e.legnth > 0)
		for(i = 0; i < e.length; i++)
			assert.equal(e[i].school, 1)
		console.log("Passed valid school test")
	}
	catch(err) {
		console.log(err)
	}
});

var testFailGetByName = course.get_by_name("xtjBs7LMhP", function(e){
	try {
		assert.equal(e.length, 0)
		console.log("Passed invalid name test")
	}
	catch(err) {
		console.log(err)
	}
});

var testGetByName = course.get_by_name("Distributed Systems", function(e){
	try {
		assert.ok(e.legnth > 0)
		for(i = 0; i < e.length; i++)
			assert.equal(e[i].name, "Distributed Systems")
		console.log("Passed valid school test")
	}
	catch(err) {
		console.log(err)
	}
});

var testFailGetByCourseNumber = course.get_by_course_number("xtjBs7LMhP", function(e){
	try {
		assert.equal(e.length, 0)
		console.log("Passed invalid course number test")
	}
	catch(err) {
		console.log(err)
	}
});

var testGetByCourseNumber = course.get_by_course_number("CS 425", function(e){
	try {
		assert.ok(e.length > 0)
		for(i = 0; i < e.length; i++)
			assert.equal(e[i].number, "CS 425")
		console.log("Passed valid course number test")
	}
	catch(err) {
		console.log(err)
	}
});

var testFailGetByTerm = course.get_by_term("xtjBs7LMhP", function(e){
	try {
		assert.equal(e.length, 0)
		console.log("Passed invalid term test")
	}
	catch(err) {
		console.log(err)
	}
});


var testGetByTerm = course.get_by_term("Sp 12", function(e){
	try {
		assert.ok(e.length > 0)
		for(i = 0; i < e.length; i++)
			assert.equal(e[i].term, "Sp 12")
		console.log("Passed valid term test")
	}
	catch(err) {
		console.log(err)
	}
});

exports.test = test;
