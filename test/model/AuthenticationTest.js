var assert = require("assert");
var authentication = require("../../node/model/Authentication.js");

/**
 * Tests for the login function that receives data from login database calls
 */
describe("login", function () {

  it("should fail if nothing was returned from the database", function (done) {

    // Check that the login function returns false if it gets no data
    var mockData = [];
    assert.equal(authentication.login(mockData, null), false);

    done();

  });

  it("should succeed and add to session if database returned valid data", function (done) {

    // Mock request & data to allow the function to add data to the session
    var mockUser = {
      email:   "someEmail",
      password:"password"
    };
    var mockRequest = { session:{} };
    var mockData = [mockUser];

    // Check that login returns true and that the user was added to the session
    assert.equal(authentication.login(mockData, mockRequest), true);
    assert.equal(mockRequest.session.user, mockUser);

    done();

  });

});

describe("register", function () {
  it("should fail if email field is empty");

  it("should fail if password field is empty");

  it("should fail if email already exists");

  it("should succeed if email, password are given and email doesn't exist");
});
