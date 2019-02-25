var brokerAddress = 'localhost';
var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://'+brokerAddress);


client.on('connect', function() {
	console.log('Connected suscessfully to broker ['+brokerAddress+']');
	client.subscribe("$SYS/broker/heap/+", function( err) {
		if ( !err ) {
			console.log("subscribe success");		
		}	
	});
});

client.on('message', function( topic, message ) {
	console.log("received data topic=["+topic+"] payload=["+message+"]");
});
