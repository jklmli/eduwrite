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
      password:"somePassword"
    };
    var mockRequest = { session:{} };
    var mockData = [mockUser];

    // Check that login returns true and that the user was added to the session
    assert.equal(authentication.login(mockData, mockRequest), true);
    assert.equal(mockRequest.session.user, mockUser);

    done();

  });

});


/**
 * Tests for the register function that receives data from login database calls
 */
describe("register", function () {

  // Mock request to provide to 'register'
  var mockRequest = {
    body: {
      email: "someEmail",
      password: "somePassword"
    }
  };

  it("should fail if no data was recieved from database", function(done) {

    // Check that register fails if it receives no data
    var usersFound = [{}, {}]; // Two 'empty' users
    assert.equal(authentication.register(usersFound, mockRequest), false);

    done();

  });

  it("should succeed and add user if data was received from database", function (done) {

    done();

  });

});
