var config = require('../config.js');

// Require libraries.
var aws = require( "aws-sdk" );

// Create an instance of our SQS Client.
var sqs = new aws.SQS({
	region: config.region,
	accessKeyId: config.accessKeyId,
	secretAccessKey: config.secretAccessKey,

	params: {
		QueueUrl: 'https://sqs.us-east-1.amazonaws.com/898046519466/packs-test'
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