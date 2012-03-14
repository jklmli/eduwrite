var assert = require('assert');
var User = require('../../node/model/User.js');
var Database = require('../../node/model/Database.js');

Database.changeDatabase('testeduwrite');
Database.changeHost('localhost');

describe('User get', function () {
  it('should return empty array when ID not found', function (done) {
    User.get(-1, function (e) {
      assert.equal(0, e.length);
      done()
    })
  });

  it('should return the correct result if the ID exists', function (done) {
    User.get(1, function (e) {
      assert.equal(1, e.length);
      done()
    })
  });
});


describe('User get_by_email', function () {
  it('should return empty array when email not found', function (done) {
    User.getByEmail(-1, function (e) {
      assert.equal(0, e.length);
      done()
    })
  });

  it('should return array consisting of single User when User with the email is found', function (done) {
    User.getByEmail('a@gmail.com', function(e) {
      assert.equal(1, e.length);
      assert.equal(1, e[0].id);
      done()
    });
  });
});

