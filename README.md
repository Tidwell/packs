Packs Game Servers

``npm install``

Create config.js with AWS SQS config info:

```javascript
module.exports = {
	region: 'us-east-1',
	accessKeyId: 'XXXX',
	secretAccessKey: 'XXXXX',
	queueUrl: 'https://sqs.XXXXX.amazonaws.com/XXXXXX'
};
```

``npm start``

TODO

- fix queue issue? some msg not sent or recieved? stop using wrappers to fix?.

- write tests for matchmaking service
- write tests for matchmaking queue service
- write tests for auth service
- have matchmaker dispatch a game create event
- have game app catch create game and spin up an in-memory game instance
	-update players ingame status
	-emit back to the queue
- have the socket service listen for game events
	-serve socketio
	-pipe game events to the correct socket rooms
	-emit connect/disconnect events
		-have matchmaker listen and remove
		-have game listen
-setup pm2 config