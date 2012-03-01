var assert = require("assert");
var user = require("../model/User.js");

describe("User get", function () {
  it("should return empty array when ID not found", function (done) {
    user.get(-1, function (e) {
      assert.equal(0, e.length);
      done()
    })
  });

  it("should return the correct result if the ID exists", function (done) {
    user.get(12, function (e) {
      assert.equal(1, e.length);
      done()
    })
  });
});


describe("User get_by_email", function () {
  it("should return empty array when email not found", function (done) {
    user.get_by_email(-1, function (e) {
      assert.equal(0, e.length);
      done()
    })
  });

  it("should return array consisting of single user when user with the email is found", function (done) {
    var d = {email:"test1234@gmail.com", password:"1234"}
    user.insert(d, function () {
      user.get_by_email("test1234@gmail.com", function (e) {
        assert.ok(e.length > 0);
        var id;
        for (var i = 0; i < e.length; i++) {
          assert.equal(e[i].email, "test1234@gmail.com")//e[i].school, 1)
          id = e[i].id
        }
        user.destroy(id, function () {
          done()
        });
      });
    })
  });
});

