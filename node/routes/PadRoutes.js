var path = require('path');
var async = require('async');
var asyncStacktrace = require('async-stacktrace');
var settings = require('../utils/Settings.js');

module.exports = {
  /**
   * Attach pad-specific routes
   */
  attachPadRoutes: function (app, padManager, exportHTML, importHandler, exportHandler, securityManager, readOnlyManager) {

    // Redirects browser to the pad's sanitized url if needed. otherwise, renders the html
    app.param('pad', function (req, res, next, padId) {

      // Ensure the padname is valid and the url doesn't end with a /
      if (!padManager.isValidPadId(padId) || /\/$/.test(req.url)) {

        res.send('Such a padname is forbidden', 404);

      } else {

        padManager.sanitizePadId(padId, function (sanitizedPadId) {

          // The pad id was sanitized, so we redirect to the sanitized version
          if (sanitizedPadId != padId) {
            var real_path = req.path.replace(/^\/p\/[^\/]+/, '/p/' + sanitizedPadId);
            res.header('Location', real_path);
            res.send("You should be redirected to <a href='" + real_path + "'>" + real_path + '</a>', 302);
          } else {

            //the pad id was fine, so just render it
            next();
          }
        });
      }
    });

    //serve read only pad
    app.get('/ro/:id', function (req, res) {
      var html;
      var padId;
      var pad;

      async.series([

        //translate the read only pad to a padId
        function (callback) {
          readOnlyManager.getPadId(req.params.id, function (err, _padId) {
            if (asyncStacktrace(err, callback)) return;

            padId = _padId;

            //we need that to tell hasPadAcess about the pad
            req.params.pad = padId;

            callback();
          });
        },

        //render the html document
        function (callback) {

          //return if the there is no padId
          if (padId == null) {
            callback('notfound');
            return;
          }

          hasPadAccess(req, res, function () {

            //render the html document
            exportHTML.getPadHTMLDocument(padId, null, false, function (err, _html) {
              if (asyncStacktrace(err, callback)) return;
              html = _html;
              callback();
            });
          }, securityManager);
        }
      ], function (err) {

        //throw any unexpected error
        if (err && err != 'notfound')
          asyncStacktrace(err);

        if (err == 'notfound')
          res.send('404 - Not Found', 404);
        else
          res.send(html);
      });
    });

    //serve pad.html under /p
    app.get('/p/:pad', function (req, res, next) {
      var filePath = path.normalize(__dirname + '/../../static/pad.html');
      res.sendfile(filePath, { maxAge: exports.maxAge });
    });

    // Attach the routes for handling interaction with the time slider for notes
    attachTimesliderRoutes(app, exportHandler, securityManager);

    //handle import requests
    app.post('/p/:pad/import', function (req, res, next) {

      //if abiword is disabled, skip handling this request
      if (settings.abiword == null) {
        next();
        return;
      }

      hasPadAccess(req, res, function () {
        importHandler.doImport(req, res, req.params.pad);
      }, securityManager);
    });

    // serve index.html under /
    app.get('/newPad/', function (req, res) {
      var filePath = path.normalize(__dirname + '/../../static/index.html');
      console.log(filePath);
      res.sendfile(filePath, { maxAge: exports.maxAge });
    });
  }
};

/**
 * Attach routes for the pad timeslider
 */
function attachTimesliderRoutes(app, exportHandler, securityManager) {

  //serve timeslider.html under /p/$padname/timeslider
  app.get('/p/:pad/timeslider', function (req, res, next) {
    var filePath = path.normalize(__dirname + '/../../static/timeslider.html');
    res.sendfile(filePath, { maxAge: exports.maxAge });
  });

  //serve timeslider.html under /p/$padname/timeslider
  app.get('/p/:pad/:rev?/export/:type', function (req, res, next) {
    var types = ['pdf', 'doc', 'txt', 'html', 'odt', 'dokuwiki'];

    //send a 404 if we don't support this filetype
    if (types.indexOf(req.params.type) == -1) {
      next();
      return;
    }

    //if abiword is disabled, and this is a format we only support with abiword, output a message
    if (settings.abiword == null &&
      ['odt', 'pdf', 'doc'].indexOf(req.params.type) !== -1) {
      res.send('Abiword is not enabled at this Etherpad Lite instance. Set the path to Abiword in settings.json to enable this feature');
      return;
    }

    res.header('Access-Control-Allow-Origin', '*');

    hasPadAccess(req, res, function () {
      exportHandler.doExport(req, res, req.params.pad, req.params.type);
    }, securityManager);
  });
}


/**
 * Checks if some requst has access to a pad. Performs the callback if allowed, otherwise returns a 403 error.
 *  @param  callback  The callback to perform if access is granted
 */
function hasPadAccess(req, res, callback, securityManager) {
  securityManager.checkAccess(req.params.pad, req.cookies.sessionid, req.cookies.token, req.cookies.password, function (err, accessObj) {
    if (asyncStacktrace(err, callback)) {
      return;
    }

    // If there is access, continue, otherwise return 403 (authorization) error
    if (accessObj.accessStatus == 'grant') {
      callback();
    } else {
      res.send("403 - Can't touch this", 403);
    }
  });
}
