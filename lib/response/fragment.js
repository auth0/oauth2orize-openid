var url = require('url')
  , qs = require('querystring')
  , AuthorizationError = require('../errors/authorizationerror');

var node6Url = require('./node6Url');

/**
* Authorization Response parameters are encoded in the fragment added to the redirect_uri when 
* redirecting back to the Client.
**/
exports = module.exports = function (txn, res, params) {
   var parsed = txn.redirectURI && !txn.redirectURI.startsWith('ms-app:') ?
     url.parse(txn.redirectURI) :
     node6Url.parse(txn.redirectURI);
  parsed.hash = qs.stringify(params);

  var location = url.format(parsed);
  return res.redirect(location);
};


exports.validate = function(txn) {
  if (!txn.redirectURI) { throw new AuthorizationError('Unable to issue redirect for OAuth 2.0 transaction', 'server_error'); }
};
