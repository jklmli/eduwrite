// Initialize the app
var express = require('express');
var app = express.createServer();
var port;

if(process.argv[2]==null){
    port = 8000;
} else {
    port = process.argv[2];
}
// Attach URL handlers
app.get('/', helloWorld);


function helloWorld(req, res) {
    res.send('Hello World!');
}



// Start the app listening on default port 3000 or 
// one from the econd rgument

app.listen(port);
console.log("Server listening on port %d in %s mode", app.address().port, app.settings.env);
