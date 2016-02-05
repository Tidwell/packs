var express = require('express');

//FIX THIS WHEN SPLIT TO ACTUAL APPS
var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/packs');

var app = express();

var bodyParser = require('body-parser');
var crossDomain = require('../../lib/cross-domain');

app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());

app.use(crossDomain);

module.exports = app;