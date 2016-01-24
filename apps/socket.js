var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var api = require('../lib/api');

io.on('connection', function(socket) {
	socket.on('disconnect', function() {
		console.log('user disconnected');
	});
	socket.on('auth', function(data) {
		api.checkAuth(data.token, function(err,user){
			if (err) { return console.log(err); }
			socket.sockUser = user;
			socket.join(user.id);
		});
	});
});

http.listen(3004, function() {
	console.log('listening on *:3004');
});

var queue = require('../lib/queue');

function sendSocketMsg(msg,done) {
	msg.to.forEach(function(room) {
		io.to(room).emit('game-event', msg.data);
	});
	done();
}

queue.listen('socket', sendSocketMsg);