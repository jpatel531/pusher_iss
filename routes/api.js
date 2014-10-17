var express = require('express');
var router = express.Router();
var pusher = require('../config/pusherConfig');
var _ = require('underscore');
var request = require('request');

var issData = {}

// Request Handlers

router.get('/location', function(req, res){
	getISSData(function(data){
		res.json(data);
	});
});


module.exports = router;

var getISSData = function(callback){
	request.get('http://api.open-notify.org/iss-now.json', function(err, res, body){
		issData = JSON.parse(body);
		if(callback) callback(issData);
	});
};

var sendISSData = function(){
	console.log("Triggering event...")
	pusher.trigger('iss-channel', 'new-location', issData);
	realTimeIss();
};


var realTimeIss = function(){
	setTimeout(function(){
		getISSData(function(){
			sendISSData();
		});
	}, 1000);
};

realTimeIss();