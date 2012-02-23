// basic test file demonstrating mocha

var assert = require('assert');

describe("test1", function() { 
	it("should pass", function(){
		assert.ok(true)
	}); 
	it("shouldn also pass", function(){
		assert.notEqual(0, 1)
	});
});
