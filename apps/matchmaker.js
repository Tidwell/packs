var express = require('express');

//FIX THIS WHEN SPLIT TO ACTUAL APPS
var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/packs');

var app = express();

var queueSender = require('../lib/queue-sender');

var bodyParser = require('body-parser');
var crossDomain = require('../lib/cross-domain');

app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(crossDomain);

function auth(req, res, next) {
	if (!req.body || !req.body.id || !req.body.token) { return res.sendStatus(400); }
	//TODO: CHECK API IF ACTUALLY AUTHED
	
	next();
}
app.post('/search-game', auth, function(req, res) {
	queueSender({type: 'matchmaking', id: req.body.id});
	return res.sendStatus(200);
});
app.post('/cancel-search-game', auth, function(req, res) {
	queueSender({type: 'cancel-matchmaking', id: req.body.id});
	return res.sendStatus(200);
});


app.listen(3002);