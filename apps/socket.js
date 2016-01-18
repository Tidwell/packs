var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', function(socket) {
	console.log('user connected');
	socket.on('disconnect', function() {
		console.log('user disconnected');
	});

	//on auth socket.join() the user's own room
});

http.listen(3004, function() {
	console.log('listening on *:3004');
});

var queue = require('../lib/queue');

function sendSocketMsg(msg,done) {
	console.log('send to ', msg.to, msg.data);
	//TODO emit only to the to rooms
	io.emit('game-event', msg.data);
	done();
}

queue.listen('socket', sendSocketMsg);