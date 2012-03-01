/*
 * Test cases for registration and login functions
 */

var facade = require("../facade/live/LiveFacade.js");

describe("register", function(){
	it("should fail if email field is empty");

	it("should fail if password field is empty");

	it("should fail if email already exists");

	it("should succeed if email, password are given and email doesn't exist");
});

describe("login", function(){
	it("should fail if email does not exist");

	it("should fail if password is incorrect");

	it("should succeed if email, password match an existing account");
});
