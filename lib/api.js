var request = require('request');

function checkAuth(token, callback) {
	var reqUrl = 'http://localhost:3000/user/' + token;
	request.get(reqUrl, {}, function(err, response, body){
		if (response.statusCode === 200) {
			callback(null, body);
		} else {
			callback(response.statusCode, body);
		}
	});
}

module.exports = {
	checkAuth: checkAuth
};