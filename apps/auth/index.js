var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var crypto = require('crypto');

var UserModel = require('./models/user');
var mongoose = require('mongoose');
var services = require('../../lib/services');

mongoose.connect(services.mongo);

var app = express();
var crossDomain = require('../../lib/cross-domain');

function auth(req, res, next) {
	if (!req.session.user) {
		return res.sendStatus(401);
	}
	next();
}

app.use(session({
	secret: 'testest',
	resave: false,
	saveUninitialized: true
}));

app.use(crossDomain);

/*REPLACE THIS WITH REAL TOKEN (OAUTH?)*/
function generateToken() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = crypto.randomBytes(1)[0] % 16 | 0,
			v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});
}

//accpets a mongoose obj
function sanitizeUser(user) {
	var u = user.toObject();

	delete u._id;
	delete u.__v;
	delete u.password;

	u.id = user._id;
	return u;
}

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

	UserModel.findOne({
		name: req.body.username
	}, function(err, user) {
		if (err || !user || !user.verifyPassword(req.body.password)) {
			return res.status(401).json({
				error: 'Invalid Credentials'
			});
		}

		//generate the users token
		user.token = generateToken();
		//save it back
		user.save(function(err, user) {
			var u = sanitizeUser(user);
			req.session.user = u;
			res.json(u);
		});
	});
   
}

function register(req, res) {
	if (req.session.user) {
		return res.status(400).json({
			error: 'Already Authenticated'
		});
	}
	if (!req.body.username || !req.body.password) {
		return res.status(400).json({
			error: 'Requires username and password'
		});
	}
	
	UserModel.findOne({
		name: req.body.username
	}, function(err, user) {
		if (user) { return res.status(400).json({ error: 'Username in use' }); }
		var u = new UserModel();
		u.name = req.body.username;
		/*
			
			BAD BAD BAD FIX ME

		 */
		u.password = req.body.password;
		u.save(function(err, user) {
			if (err) {
				return res.sendStatus(500);
			}
			authenticate(req,res);
		});

	});
}

app.post('/login', bodyParser.urlencoded({
	extended: false
}), bodyParser.json(), authenticate);

app.get('/logout', function(req, res) {
	req.session.destroy();
	res.sendStatus(200);
});

app.post('/register', bodyParser.urlencoded({ extended: false }), bodyParser.json(), register);

//profile
app.get('/user', auth, function(req, res) {
	res.json(req.session.user);
});

//token check
app.get('/user/:token', function(req, res) {
	UserModel.find({
		token: req.params.token
	}, function(err, users) {
		if (err || !users || users.length > 1) {
			return res.sendStatus(400);
		}
		res.json({id: users[0].id, name: users[0].name});
	});
});

app.listen(3000);