var config = require('../config.js');

// Require libraries.
var aws = require( "aws-sdk" );

// Create an instance of our SQS Client.
var sqs = new aws.SQS({
	region: config.region,
	accessKeyId: config.accessKeyId,
	secretAccessKey: config.secretAccessKey,

	params: {
		QueueUrl: config.queueUrl
	}
});


function send(data) {
	sqs.sendMessage({
		MessageBody: JSON.stringify(data)
	}, function(err,data){
		if (err) {
			console.log(err);
		}
	});
}

module.exports = send;