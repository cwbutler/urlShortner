// Express
var express = require('express');
var app = express();

// MongoDB URL Store
var urlStore = require('./store.js');

// Route to shorten and store URL
// Expects url to be a query parameter.
// Ex: http://localhost:6000/?url=google.com
app.get('/', function (req, res, next) {
  // Check for required query param.
  if (!req.query.url) {
    var error = new Error('URL query parameter must be provided.');
    error.status = 400; // Bad Request
    return next(error);
  }

  // Either create a new short url in database
  // or resolve to a previously shortened URL.
  urlStore.shorten(req.query.url)
    .then(function (url) {
      res.json({
        url: url.url,
        shortened: url.hash
      });
    })
    .fail(next);
});

// Route to resolve shorten URL to original.
// Also returns hit counts
app.get('/:id', function (req, res, next) {
  // Resolve shortened url from DB
  urlStore.resolve(req.params.id)
    .then(function (url) {
      res.json({
        url: url.url,
        totalHits: url.totalHits
      });
    })
    .fail(next);
});

// Start express server
var server = app.listen(3000, function () {
  console.log('Web Server listening at: http://%s:%s', server.address().address, server.address().port);
});