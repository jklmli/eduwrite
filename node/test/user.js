var assert = require("assert");
var user = require("../model/user.js");

    //run tests
var testGet = user.get(1,function(e){
    assert.equal(e.length,0);
});


var testGetEmail = user.get_by_email("kduber2@illinois.edu",function(e){
    console.log(e);
    assert.equal(e.length,1);
    assert.equal(e[0].email,"kduber2@illinois.edu");
});
