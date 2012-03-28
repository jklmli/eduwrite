var assert = require('assert');
var Role = require('../../node/model/Role.js');
var Database = require('../../node/model/Database.js');

// Change to local test database
Database.changeDatabase('testeduwrite');
Database.changeHost('localhost');

/**
 *  Test Role.get(id, callback)
 */
describe('Role get', function() {

  it('should return empty array when ID not found', function(done) {
    Role.get(5)
      .then(function(roleData) {

        assert.equal(0, roleData.length);
        done();

      });
  });

  it('should return correct result when ID exists', function(done) {
    Role.get(1)
      .then(function(roleData) {

        assert.equal(1, roleData.length);
        assert.equal(1, roleData[0].id);
        done();

      });
  });
});


/**
 *  Test Role.getByName(name, callback)
 */
describe('Role getByName', function() {

  it('should return empty array when name not found', function(done) {
    Role.getByName('')
      .then(function(roleData) {

        assert.equal(0, roleData.length);
        done();

      });
  });

  it('should return correct result when name exists', function(done) {
    Role.getByName('Student')
      .then(function(roleData) {

        assert.equal(1, roleData.length);
        assert.equal(1, roleData[0].id);
        done();

      });
  });
});

/**
 *  Test Role.getByUserId(userId, callback)
 */
describe('Role getByUserId', function() {

  it('should return empty array when ID not found');

  it('should return correct result when ID exists');

});

/**
 *  Test Role.insert(role, callback) and Role.destroy(id, callback)
 */
describe('Role insert, destroy', function() {

});
