var brokerAddress = 'localhost';
var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://'+brokerAddress);

//
var testLogic = require("./receiveFileWriter.js");

client.on('connect', function() {
	console.log("Connected suscessfully to broker ["+brokerAddress+"]");
	testLogic.onConnect( client );
});

client.on('message', function( topic, message ) {
	console.log("received data topic=["+topic+"] payload=["+message+"]");
	testLogic.onMessage( topic, message );
});
