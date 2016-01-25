var express = require('express');
var path = require('path');
var app = express();
var services = require('../../lib/services');

app.use(express.static(path.join(__dirname , '/angular/app')));
app.use(express.static(path.join(__dirname , '/angular/bower_components')));
app.get('/services.json', function(req,res){
	res.json(services);
});

app.listen(3001);