var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');

var models = require('../models');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/packs');

var app = express();
var queueSender = require('./queue-sender');

function auth(req, res, next) {
	if (!req.session.user) {
		return res.send(401);
	}
	next();
}

app.use(session({
	secret: 'testest',
	resave: false,
	saveUninitialized: true
}));

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "http://localhost:3001");
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Credentials', true);
	next();
});

function authenticate(req, res) {
	if (req.session.user) {
		return res.status(400).json({
			error: 'Already Authenticated'
		});
	}
	if (!req.body.username || !req.body.password) {
		return res.status(401).json({
			error: 'Missing Username or Password'
		});
	}

	models.user.findOne({
		name: req.body.username
	}, function(err, user) {
		if (err || !user || !user.verifyPassword(req.body.password)) {
			return res.status(401).json({
				error: 'Invalid Credentials'
			});
		}

		var u = user.toObject();

		delete u._id;
		delete u.__v;
		delete u.password;

		u.id = user._id;

		req.session.user = u;
		res.json(u);
	});

}

app.post('/login', bodyParser.urlencoded({
	extended: false
}), authenticate);
app.get('/logout', function(req, res) {
	req.session.destroy();
	res.sendStatus(200);
});

app.post('/search-game', auth, function(req, res) {
	if (req.session.user.searching) {
		queueSender({type: 'matchmaking'});
		return res.sendStatus(200);
	}
	models.user.findOne({
		_id: req.session.user.id
	}, function(err, user) {
		if (err || !user) {
			return res.sendStatus(500);
		}
		user.searching = true;
		user.save(function(err) {
			queueSender({type: 'matchmaking'});
			return res.sendStatus(err ? 500 : 200);
		});
	});
});
app.post('/game-action', auth, function(req, res) {
	res.sendStatus(200);
});
app.get('/user', auth, function(req,res){
	res.json(req.session.user);
});

app.listen(3000);