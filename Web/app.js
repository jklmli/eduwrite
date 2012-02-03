
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')

var mockAPI = require('./MockAPI');
var app = module.exports = express.createServer();
var api = mockAPI;


var port;
if(process.argv[2]==null){
    port = 8000;
} else {
    port = process.argv[2];
}

// Configuration

var secret = "dBYIfvlQfQfxILZWuhR9b3TOIQGeks9PHwAqikbaZ+EWD0bAt9GA32ZCMs5ZmQbQ";
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({secret:secret}));
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/test', routes.index);
// Attach URL handlers for pages
app.get('/', home);

// Attach URL handlers for API calls
//app.get('/login', mockAPI.login);
app.get('/login', mockAPI.login);
app.get('/logout', api.logout);
app.get('/getUserData', api.getUserData);
app.get('/getClasses', api.getClasses);
app.get('/getLectures', api.getLectures);
app.get('/getUsers', api.getUsers);
app.get('/sendMessage', api.sendMessage);
app.get('/receiveMessage', api.receiveMessage);
app.get('/listUsers', api.listUsers);
app.get('/search', api.search);

function home(req, res) {
    res.send('<html>Homepage!<br /><a href="test">Go to Test page-></a></html>');
}

app.listen(port);
//console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
