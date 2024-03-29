var log4js = require('log4js');
var formidable = require('formidable');

module.exports = new function() {
  var _this = this;

  /**
   * Attach API handlers to the server
   * @param app A handle on the HTTP server
   */
  this.attachAPIRoutes = function(app) {

    // A logger just for API actions
    var apiLogger = log4js.getLogger('API');

    // This is for making an api call, collecting all post information and passing it to the apiHandler
    var apiCaller = function apiCaller(req, res, fields) {
      res.header('Content-Type', 'application/json; charset=utf-8');

      apiLogger.info('REQUEST, ' + req.params.func + ', ' + JSON.stringify(fields));

      //wrap the send function so we can log the response
      res._send = res.send;
      res.send = function(response) {
        response = JSON.stringify(response);
        apiLogger.info('RESPONSE, ' + req.params.func + ', ' + response);

        //is this a jsonp call, if yes, add the function call
        if (req.query.jsonp) {
          response = req.query.jsonp + '(' + response + ')';
        }

        res._send(response);
      };

      //call the api handler
      apiHandler.handle(req.params.func, fields, req, res);
    };

    // This is a api GET call, collect all post informations and pass it to the apiHandler
    app.get('/api/1/:func', function(req, res) {
      apiCaller(req, res, req.query)
    });

    // This is an api POST call, collect all post informations and pass it to the apiHandler
    app.post('/api/1/:func', function(req, res) {
      new formidable.IncomingForm().parse(req, function(err, fields, files) {
        apiCaller(req, res, fields)
      });
    });
  };

  return this;
};