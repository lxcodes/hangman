/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

process.on('uncaughtException', function(err) {
  console.log('Caught exception: ' + err);
});

var Hangman = function() {
  this.app = app;
}

Hangman.prototype.start = function () {
  if (this.server.address()) console.log('Hangman started on port %s', this.server.address().port);
}

module.exports = Hangman;