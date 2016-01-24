Packs Game Servers

install mongo

install node

run mongo

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
all services will be on separate sockets

auth			3000
static-files	3001
socket			3004
matchmaker 		3002


OR USE THE VAGRANT

``vagrant up``
auth-dev.packs.com
app-dev.packs.com
socket-dev.packs.com
matchmaker-dev.packs.com

add to etc/hosts
``10.0.33.34      auth-dev.packs.com app-dev.packs.com socket-dev.packs.com matchmaker-dev.packs.com``

TODO


SOCKET
-add auth check
-pipe game events to the correct socket rooms
-emit connect/disconnect events

AUTH
-return user id, user name from auth check

MATCHMAKER
-listen for socket disconnect and remove

GAME
-listen for socket disconnect and handle

-setup pm2 config