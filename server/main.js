/*
 * Copyright 2012-2013 the original author or authors
 * @license MIT, see LICENSE.txt for details
 *
 * @author Scott Andrews
 */

var http, express, sockjs, redis, msgs, path, host, port, app, server, ws;

if (process.env.VCAP_APPLICATION) {
	require('cf-autoconfig');
}

http = require('http');
express = require('express');
sockjs = require('sockjs');
redis = require('redis');
msgs = require('msgs');

// msgs extensions
require('msgs/adapters/nodeStream');
require('msgs/adapters/redis');
require('msgs/channels/pubsub');

path = process.env.PWD + '/client';
host = '127.0.0.1';
port = 8000;

// create http server
app = express();
server = http.createServer(app);

// create websocket server
ws = sockjs.createServer({ jsessionid: true });
ws.installHandlers(server, { prefix: '/msgs' });

app.configure(function () {
	// setup express to server files from the client directory
	app.use(express.static(path));
	app.use(express.directory(path));
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});


// create channels
msgs.pubsubChannel('fromClient');
msgs.pubsubChannel('toClient');

ws.on('connection', function (connection) {
	// for each web socket connection, publish message to the fromClient channel and subscribe to message on the toClient channel
	msgs.nodeStreamGateway(connection, { output: 'fromClient', input: 'toClient' });
});

if (process.env.VCAP_SERVICES) {
	console.log('Configuring with Redis');
	// broadcast message to every other server ndoe via Redia pub/sub
	msgs.redisGateway(redis.createClient, 'circles', { output: 'toClient', input: 'fromClient' });
}
else {
	console.log('Configuraing for a single instance');
	// pass message directly from the 'fromClient' channel to the 'toClient' channel
	msgs.forward('fromClient', 'toClient');
}

// uncomment for debug logging
//msgs.logger({ tap: 'fromClient', prefix: 'fromClient: ' });
//msgs.logger({ tap: 'toClient', prefix: 'toClient: ' });
//msgs.logger({ tap: 'deadLetterChannel', prefix: 'deadLetterChannel: ' });
//msgs.logger({ tap: 'invalidMessageChannel', prefix: 'invalidMessageChannel: ' });

console.log('Serving @ ' + host + ':' + port + ' (' + path + ')');
server.listen(port, host);
