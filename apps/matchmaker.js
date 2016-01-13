var config = require('../config.js');

var aws = require("aws-sdk");
var Consumer = require('sqs-consumer');

var sqs = new aws.SQS({
	region: config.region,
	accessKeyId: config.accessKeyId,
	secretAccessKey: config.secretAccessKey,
});

var app = Consumer.create({
  queueUrl: config.queueUrl,
  handleMessage: function (message, done) {
    console.log(JSON.parse(message.Body));
    done();
  },
  sqs: sqs
});

app.start();