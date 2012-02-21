var assert = require("assert");
var user = require("../model/user.js");

   //run tests
   //
   //
var count = 0;

var test_get = user.get(1,function(e){
    assert.equal(e.length,0);
    console.log("Test testGet passed");
});


var test_get_by_email = user.get_by_email("kduber2@illinois.edu",function(e){
    try {
        assert.equal(1,2);
        assert.fail();
    } catch(err){
        assert.ok(true);
    }
    assert.equal(e.length,1);
    assert.equal(e[0].email,"kduber2@illinois.edu");
    console.log("Test get email passed");
});

var test_destroy = 3;

var test_get_by_email_and_password = 1;


