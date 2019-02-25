var subscriptionListFileName = 'subscriptionList.txt';
var topicList = [];
var mqttClient = null;

const fs = require('fs');
const readline = require('readline');

function addTopicToList( topic ) {
	console.log(topic);
	topicList.push(topic);
}

function subscribeTopic( topic ) {
	mqttClient.subscribe( topic, function( error ) {
		if (!error) {
			console.log("subscribe for " + topic + " successful");
		} else {
			console.log("failed to subscribe for " + topic + " - error ["+error.toString()+"]");
		}
	});
}



exports.onConnect = function( client ) {
	mqttClient = client;
	const rl = readline.createInterface( { input: fs.createReadStream(subscriptionListFileName ) } );
	rl.on('line', subscribeTopic );
	rl.on('error', function() { console.log( 'failed to open ' +subscriptionListFileName ); } );
}

exports.onMessage = function( topic, message ) {
}
