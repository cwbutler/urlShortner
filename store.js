// MongoDB Store
var connection = require('mongoose').connect('mongodb://localhost/test');
// Mongoose URL schema shortening and storing URLs
// https://github.com/dropshape/MongooseURLShortener
var Shortener = require('mongoose-url-shortener').MongooseURLShortener;

module.exports = new Shortener(connection);