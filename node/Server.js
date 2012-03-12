/**
 * This module is started with bin/run.sh. It sets up a Express HTTP and a Socket.IO Server.
 * Static file Requests are answered directly from this module, Socket.IO messages are passed
 * to MessageHandler and minfied requests are passed to minified.
 */


// Include necessary libraries
var log4js = require('log4js');
var os = require('os');
var socketio = require('socket.io');
var fs = require('fs');
var settings = require('./utils/Settings');
var db = require('./db/DB');
var async = require('async');
var express = require('express');
var path = require('path');
var minify = require('./utils/Minify');
var formidable = require('formidable');


// Includes to be performed asynchronously
var apiHandler;
var exportHandler;
var importHandler;
var exportHTML;
var readOnlyManager;
var padManager;
var securityManager;
var socketIORouter;


// EduWrite routes
var facadeRoutes;
var pageRoutes;


// Parse application port from parameter
var userPort = null;
if (process.argv[2] != null) {
  userPort = process.argv[2];
}


// Try to get the git version
var version = '';
try {
  var rootPath = path.normalize(__dirname + '/../');
  var ref = fs.readFileSync(rootPath + '.git/HEAD', 'utf-8');
  var refPath = rootPath + '.git/' + ref.substring(5, ref.indexOf('\n'));
  version = fs.readFileSync(refPath, 'utf-8');
  version = version.substring(0, 7);
} catch (error) {
  console.warn("Can't get git version for server header\n" + error.message);
}


// Cache 6 hours
exports.maxAge = 1000 * 60 * 60 * 6;


// Set loglevel
log4js.setGlobalLogLevel(settings.loglevel);


// Asynchronously initialize the database & HTTP server in sequence
async.waterfall([
  initializeDatabase,
  asyncImport,
  initializeHTTPServer
]);


/**
 * Initialize the database
 * @param callback  The callback function to perform on completion (for async waterfall)
 */
function initializeDatabase(callback) {
  db.init(callback);
}


/**
 * Perform all asynchronous imports
 * @param callback  The callback function to perform on completion (for async waterfall)
 */
function asyncImport(callback) {

  // Load etherpad-lite modules that needs a initalized DB
  readOnlyManager = require('./db/ReadOnlyManager');
  exportHTML = require('./utils/ExportHtml');
  exportHandler = require('./handler/ExportHandler');
  importHandler = require('./handler/ImportHandler');
  apiHandler = require('./handler/APIHandler');
  padManager = require('./db/PadManager');
  securityManager = require('./db/SecurityManager');
  socketIORouter = require('./handler/SocketIORouter');

  // Load EduWrite writes, which requires an initialize DB
  //
  facadeRoutes = require('./routes/FacadeRoutes.js');
  pageRoutes = require('./routes/PageRoutes.js');

  callback(null);
}


/**
 * Initialize the HTTP server
 *  @param callback  The callback function to perform on completion (for async waterfall)
 */
function initializeHTTPServer(callback) {

  // Create server
  var app = express.createServer();

  // Name the server
  app.use(function (req, res, next) {
    var serverName = 'Etherpad-Lite ' + version + ' (http://j.mp/ep-lite)';
    res.header('Server', serverName);
    next();
  });

  //install logging
  var httpLogger = log4js.getLogger('http');

  // The secret for the cookie parser
  var secret = 'dBYIfvlQfQfxILZWuhR9b3TOIQGeks9PHwAqikbaZ+EWD0bAt9GA32ZCMs5ZmQbQ';

  // Configure the global app settings
  attachGlobalAppSettings(app, httpLogger, secret);

  // Attach routes for hvandling error & diagnostics
  attachErrorHandlingRoutes(app, gracefulShutdown);

  // Attach routes for serving static files
  attachStaticRoutes(app);

  // Attach routes for pads
  var padRoutes = require('./routes/PadRoutes.js');
  padRoutes.attachPadRoutes(app, padManager, exportHTML, importHandler, exportHandler, securityManager, readOnlyManager);

  // Attach API handlers to the app
  var apiRoutes = require('./routes/APIRoutes.js');
  apiRoutes.attachAPIRoutes(app);

  // Attach the EduWrite-specific routes to the HTTP server
  attachEduWriteRoutes(app);

  // Add dynamic helpers
  app.dynamicHelpers({
    error:   function (req, res) {
      return req.flash('error');
    },
    success: function (req, res) {
      return req.flash('success');
    },
    info:    function (req, res) {
      return req.flash('info');
    },
    loggedIn:function (req, res) {
      if (req.session.user) {
        return true;
      }
      return false;
    },
    user:    function (req, res) {
      return req.session.user;
    }
  });

  // Start the server
  var returnValues = startServer(app, arguments);
  var gracefulShutdown = returnValues.gracefulShutdown;
  var io = returnValues.io;

  // Attach message handlers for pads & the timeslider
  var padMessageHandler = require('./handler/PadMessageHandler');
  var timesliderMessageHandler = require('./handler/TimesliderMessageHandler');

  //Initalize the Socket.IO Router
  socketIORouter.setSocketIO(io);
  socketIORouter.addComponent('pad', padMessageHandler);
  socketIORouter.addComponent('timeslider', timesliderMessageHandler);

  callback(null);
}


/**
 * Attaches the EduWrite page & facade routes
 */
function attachEduWriteRoutes(app) {

  // Page routes
  app.get('/', pageRoutes.home);
  app.get('/about', pageRoutes.about);
  app.get('/register', pageRoutes.register);
  app.get('/login', pageRoutes.login);
  app.get('/logout', pageRoutes.logout);
  app.get('/accountManagement', pageRoutes.accountManagement);
  app.get('/accountManagement/profile', pageRoutes.accountManagementProfile);
  app.get('/accountManagement/notePermissions', pageRoutes.accountManagementNotePermissions);
  app.get('/accountManagement/settings', pageRoutes.accountManagementSettings);
  app.get('/accountManagement/help', pageRoutes.accountManagementHelp);

  // Facade routes
  app.post('/getUser', facadeRoutes.getUser);
  app.post('/closeAccount', facadeRoutes.closeAccount);
  app.post('/register', facadeRoutes.register);
  app.post('/setPermissions', facadeRoutes.setPermissions);
  app.get('/notes/add', facadeRoutes.addNote);
  app.post('/addNote', facadeRoutes.addNote);
  app.post('/removeNote', facadeRoutes.removeNote);
  app.post('/getNotesByUserId', facadeRoutes.getNotesByUserId);
  app.get('/notes', facadeRoutes.getNotesByUserId);
  app.get('/notes/add', facadeRoutes.addNote);
  app.post('/updateNote', facadeRoutes.updateNote);
  app.post('/getNotesByLectureId', facadeRoutes.getNotesByLectureId);
  app.post('/getLecturesByClassId', facadeRoutes.getLecturesByClassId);
  app.post('/getLecturesByCourseId', facadeRoutes.getLecturesByCourseId);
  app.post('/getClasses', facadeRoutes.getClasses);
  app.post('/getInstructor', facadeRoutes.getInstructor);
  app.post('/addLecture', facadeRoutes.addLecture);
  app.post('/addClass', facadeRoutes.addClass);
  app.post('/removeUser', facadeRoutes.removeUser);
  app.post('/login', facadeRoutes.login);
  app.post('/logout', facadeRoutes.logout);
  app.get('/notes/', facadeRoutes.getNotes);
}


/**
 * Attach the global app settings
 */
function attachGlobalAppSettings(app, httpLogger, secret) {

  // Attach generic global settings
  app.configure(function globalConfigureApp() {

    // Activate http basic auth if it has been defined in settings.json
    if (settings.httpAuth != null) {
      app.use(basicAuthorization);
    }

    /**
     * If the log level specified in the config file is WARN or ERROR the application server never starts listening to
     *  requests as reported in issue #158. Not installing the log4js connect logger when the log level has a higher
     *  severity than INFO since it would not log at that level anyway.
     */
    if (!(settings.loglevel === 'WARN' || settings.loglevel == 'ERROR')) {
      app.use(log4js.connectLogger(httpLogger, { level:log4js.levels.INFO, format:':status, :method :url'}));
    }
    app.use(express.cookieParser());

    // Handle views with Jade templating & inheritance
    app.set('views', __dirname + '/views');
    app.set('view options', { layout:false });
    app.set('view engine', 'jade');
    app.use(express.bodyParser());

    // Parse cookies & handle sessions
    app.use(express.cookieParser());
    app.use(express.session({secret:secret}));

    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
  });

  // Configure development vs production error handling
  app.configure('development', function () {
    app.use(express.errorHandler({ dumpExceptions:true, showStack:true }));
  });
  app.configure('production', function () {
    app.use(express.errorHandler());
  });
}


/**
 * Actually start the HTTP server & attach signal handlers
 */
function startServer(app, arguments) {

  // Let the server listen (take user input if specified, otherwise run on port specified in settings.port
  var port;
  if (userPort != null) {
    port = userPort
  } else {
    port = settings.port;
  }
  app.listen(port, settings.ip);
  console.log('Server is listening at ' + settings.ip + ':' + port);

  var onShutdown = false;
  var gracefulShutdown = function (err) {
    if (err && err.stack) {
      console.error(err.stack);
    } else if (err) {
      console.error(err);
    }

    //ensure there is only one graceful shutdown running
    if (onShutdown) return;
    onShutdown = true;

    console.log('graceful shutdown...');

    //stop the http server
    app.close();

    //do the db shutdown
    db.db.doShutdown(function () {
      console.log('db sucessfully closed.');
      process.exit(0);
    });

    setTimeout(function () {
      process.exit(1);
    }, 3000);
  };

  //connect graceful shutdown with sigint and uncaughtexception
  if (os.type().indexOf('Windows') == -1) {

    // SIGINT is not working on windows so far: https://github.com/joyent/node/issues/1553
    process.on('SIGINT', gracefulShutdown);
  }
  process.on('uncaughtException', gracefulShutdown);

  // Init socket.io and redirect all requests to the MessageHandler
  var io = socketio.listen(app);

  //this is only a workaround to ensure it works with all browers behind a proxy
  //we should remove this when the new socket.io version is more stable
  io.set('transports', ['xhr-polling']);

  var socketIOLogger = log4js.getLogger('socket.io');
  io.set('logger', {
    debug:function (str) {
      socketIOLogger.debug.apply(socketIOLogger, arguments);
    },
    info: function (str) {
      socketIOLogger.info.apply(socketIOLogger, arguments);
    },
    warn: function (str) {
      socketIOLogger.warn.apply(socketIOLogger, arguments);
    },
    error:function (str) {
      socketIOLogger.error.apply(socketIOLogger, arguments);
    }
  });

  // Minify socket.io javascript
  if (settings.minify) {
    io.enable('browser client minification');
  }
  return {gracefulShutdown:gracefulShutdown, io:io};
}


/**
 * Attach routes for serving static files
 */
function attachStaticRoutes(app) {

  // Serve anything in 'static' directory
  app.get('/static/js/require-kernel.js', function (req, res, next) {
    res.header('Content-Type', 'application/javascript; charset: utf-8');
    res.write(minify.requireDefinition());
    res.end();
  });
  app.get('/static/*', function (req, res) {
    var filePath = path.normalize(__dirname + '/..' +
      req.url.replace(/\.\./g, '').split('?')[0]);
    res.sendfile(filePath, { maxAge:exports.maxAge });
  });

  //serve robots.txt
  app.get('/robots.txt', function (req, res) {
    var filePath = path.normalize(__dirname + '/../static/robots.txt');
    res.sendfile(filePath, { maxAge:exports.maxAge });
  });

  //serve favicon.ico
  app.get('/favicon.ico', function (req, res) {
    var filePath = path.normalize(__dirname + '/../static/custom/favicon.ico');
    res.sendfile(filePath, { maxAge:exports.maxAge }, function (err) {

      //there is no custom favicon, send the default favicon
      if (err) {
        filePath = path.normalize(__dirname + '/../static/favicon.ico');
        res.sendfile(filePath, { maxAge:exports.maxAge });
      }
    });
  });

  //serve minified files
  app.get('/minified/:filename', minify.minifyJS);
}

/**
 * Checks for basic HTTP authorization
 */
function basicAuthorization(req, res, next) {
  if (req.headers.authorization && req.headers.authorization.search('Basic ') === 0) {

    // fetch login and password
    if (new Buffer(req.headers.authorization.split(' ')[1], 'base64').toString() == settings.httpAuth) {
      next();
      return;
    }
  }

  res.header('WWW-Authenticate', "Basic realm='Protected Area'");
  if (req.headers.authorization) {
    setTimeout(function () {
      res.send('Authentication required', 401);
    }, 1000);
  } else {
    res.send('Authentication required', 401);
  }
}

/**
 * Attach routes for handling errors
 */
function attachErrorHandlingRoutes(app, gracefulShutdown) {
  app.error(function (err, req, res, next) {
    res.send(500);
    console.error(err.stack ? err.stack : err.toString());
    gracefulShutdown();
  });

  // The Etherpad client side sends information about how a disconnect happen
  app.post('/ep/pad/connection-diagnostic-info', function (req, res) {
    new formidable.IncomingForm().parse(req, function (err, fields, files) {
      console.log('DIAGNOSTIC-INFO: ' + fields.diagnosticInfo);
      res.end('OK');
    });
  });

  // The Etherpad client side sends information about client side javscript errors
  app.post('/jserror', function (req, res) {
    new formidable.IncomingForm().parse(req, function (err, fields, files) {
      console.error('CLIENT SIDE JAVASCRIPT ERROR: ' + fields.errorInfo);
      res.end('OK');
    });
  });
}
