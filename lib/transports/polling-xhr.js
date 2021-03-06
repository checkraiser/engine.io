
/**
 * Module dependencies.
 */

var Polling = require('./polling')
  , Transport = require('../transport')

/**
 * Module exports.
 */

module.exports = XHR;

/**
 * Ajax polling transport.
 *
 * @api public
 */

function XHR (req) {
  Polling.call(this, req);
};

/**
 * Inherits from Polling.
 */

XHR.prototype.__proto__ = Polling.prototype;

/**
 * Frames data prior to write.
 *
 * @api private
 */

XHR.prototype.doWrite = function (data) {
  var headers = {
      'Content-Type': 'text/plain; charset=UTF-8'
    , 'Content-Length': Buffer.byteLength(data)
    , 'Connection': 'Keep-Alive'
  };

  this.res.writeHead(200, this.headers(this.req, headers));
  this.res.end(data);
};

/**
 * Returns headers for a response.
 *
 * @param {http.ServerRequest} request
 * @param {Object} extra headers
 * @api private
 */

XHR.prototype.headers = function (req, headers) {
  headers = headers || {};

  if (req.headers.origin) {
    headers['Access-Control-Allow-Credentials'] = 'true';
    headers['Access-Control-Allow-Origin'] = req.headers.origin;
  } else {
    headers['Access-Control-Allow-Origin'] = '*';
  }

  return headers;
};
