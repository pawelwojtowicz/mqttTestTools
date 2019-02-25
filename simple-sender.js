const brokerAddress = 'localhost';
const mqtt = require('mqtt');
var client = mqtt.connect('mqtt://'+brokerAddress);

console.log(process.argv.length);

if ( process.argv.length <= 4 ) {
	console.log( "Not enough parameters");
	console.log( "usage:");
	console.log( "	nodejs simple-sender msgCount topic message payload");
	process.exit();
}

var msgCount = parseInt(process.argv[2]);
var topic = process.argv[3];
var message = process.argv[4];

console.log("simple-sender count=" + msgCount.toString() +", topic="+topic+" , message="+message);

var count = 0;

function publishMessage () {
	if ( count <= msgCount ) {
		var messageText = message + " " + count.toString();
		client.publish( topic , messageText , function() {
			++count;			
			publishMessage();
					
		});
	} else {
		client.end();	
	}
}

client.on('connect', function() {
	console.log("Connected suscessfully to broker ["+brokerAddress+"]");
	publishMessage();
});
