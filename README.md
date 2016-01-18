Packs Game Servers

``npm install``

Create config.js with AWS SQS config info:

```javascript
module.exports = {
	region: 'us-east-1',
	accessKeyId: 'XXXX',
	secretAccessKey: 'XXXXX',
	queuePrefix: 'https://sqs.XXXXX.amazonaws.com/######/XXXXXX'
};
```

``npm start``

TODO

- write tests for matchmaking service
- write tests for matchmaking queue service
- write tests for auth service

-create node API for checking if user token is valid
	-returns user id, user name

-pipe game events to the correct socket rooms

-emit connect/disconnect events
	-have matchmaker listen and remove
	-have game listen

-setup pm2 config