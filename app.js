var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs  = require('express-handlebars');

var methodOverride = require('method-override');
var mongoose = require('mongoose');
var restify = require('express-restify-mongoose');
var app = express();
var router = express.Router();

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

var passport = require('passport');
var LocalStrategy = require('passport-local');

var models = require('./models');

var flash = require('connect-flash');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  helpers: {
    json: function(data){ return JSON.stringify(data); }
  }
}));
app.set('view engine', 'handlebars');

passport.use(new LocalStrategy(
  function(username, password, done) {
    models.user.findOne({ name: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.verifyPassword(password)) { return done(null, false); }
      return done(null, user);
    });
  }
));

passport.serializeUser(function(user, done) {
  console.log(user.id)
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  console.log(id)
  models.user.findOne({ _id: id }, function(err, user) {
    console.log(err,user)
    done(err, user);
  });
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride());
app.use(require('express-session')({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


app.post('/login',
  passport.authenticate('local', { failureRedirect: '/login',  successRedirect: '/game',  failureFlash: true }));

app.get('/game', passport.authenticate('local', { failureRedirect: '/login',  failureFlash: true }), function(req, res, next) {
  res.render('game');
});

//set up db and REST routes
mongoose.connect('mongodb://localhost/packs');
restify.serve(router, models.game);
restify.serve(router, models.user);

app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);
app.use(router);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
