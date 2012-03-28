var assert = require("assert");
var authentication = require("../../node/model/Authentication.js");
var User = require("../../node/model/User.js");

/**
 * Tests for the login function that receives data from login database calls
 */
describe("login", function() {

  it("should fail if nothing was returned from the database", function(done) {

    // Check that the login function returns false if it gets no data
    var mockData = [];
    assert.equal(authentication.login(mockData, null), false);

    done();
  });

  it("should succeed and add to session if database returned valid data", function(done) {

    // Mock request & data to allow the function to add data to the session
    var mockUser = {
      email: "someEmail",
      password: "somePassword"
    };
    var mockRequest = {
      session: {}
    };
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
describe("register", function() {

  // Mock request to provide to 'register'
  var mockUser = {
    email: "someEmail",
    password: "somePassword"
  };
  var mockRequest = {
    body: mockUser
  };

  it("should fail if data was recieved from database", function(done) {

    // Check that register fails if it receives user data
    var usersFound = [
      {}  // 'empty' user
    ];
    assert.equal(authentication.register(usersFound, mockRequest), false);

    done();
  });

  it("should succeed and add user if no data was received from database", function(done) {

    // Check that registration succeeds if it receives no data
    assert.equal(authentication.register([], mockRequest), true);

    // Fetch this data from the database
    User.getByEmailAndPassword(mockUser.email, mockUser.password)
      .then(function(data) {

        // Check we fetched some data & the user retrieved is our mock user
        assert.equal(data.length > 0, true);
        assert.equal(data[0].email, mockUser.email);

        done();

        // Remove this user
        User.destroy(data[0].id);
      });
  });
});
