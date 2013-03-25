/*
 * Copyright 2012-2013 the original author or authors
 * @license MIT, see LICENSE.txt for details
 *
 * @author Scott Andrews
 */

(function (document) {
	define(function (require) {

		var clickStreams, circle, curry, colorGenerator, dom, SockJS, msgs;

		clickStreams = require('./clicks');
		circle = require('./circle');
		curry = require('./curry');
		colorGenerator = require('./colorGenerator');
		dom = require('./dom');
		SockJS = require('sockjs');
		msgs = require('msgs/adapters/webSocket');
		require('domReady!');


		// Setup msgs channels and adapters
		msgs.channel('toServer');
		msgs.channel('fromServer');

		// communicate with the server via SockJS web sockets
		msgs.webSocketGateway(new SockJS('/msgs'), { output: 'fromServer', input: 'toServer' });

		msgs.bus(function (bus) {
			bus.channel('events');

			// capture clicks stream
			clickStreams.init(bus.inboundAdapter('events'));
			bus.chain([
				// augment events with source metadata before sending to server
				bus.transform(clickStreams.toMinimalEvent),
				bus.transform(circle.addInfo({
					id: '' + Date.now() + '-' + (1 + (Math.random() * 10000)).toFixed(0),
					color: colorGenerator()
				})),
				bus.transform(JSON.stringify)
			], { input: 'events', output: 'toServer' });
		});

		msgs.bus(function (bus) {
			// handle stream of remote events
			bus.transform(JSON.parse, { input: 'fromServer', output: 'events' });
			bus.channel('events');

			// route message based on event type
			bus.router(function (msg) { return msg.payload.type; }, { input: 'events' });

			bus.channel('click');
			bus.chain([
				// process click events
				bus.transform(circle.pairWith(document.getElementById('mouse-click-template'))),
				bus.transform(dom.addClickMarker),
				bus.outboundAdapter(dom.appendClass('click'))
			], { input: 'click' });

			bus.channel('mousemove');
			bus.chain([
				// process mousemove events
				bus.transform(circle.find(dom.findCircleNode)),
				bus.transform(function (pair) {
					if (dom.nodeIsMissing(pair)) {
						pair = dom.createNodeForPair(pair);
					}
					return pair;
				}),
				bus.outboundAdapter(circle.move)
			], { input: 'mousemove' });
		});

		// uncomment to log raw message
//		msgs.logger({ tap: 'toServer', prefix: 'toServer: ' });
//		msgs.logger({ tap: 'fromServer', prefix: 'fromServer: ' });
//		msgs.logger({ tap: 'deadLetterChannel', prefix: 'deadLetterChannel: ' });
//		msgs.logger({ tap: 'invalidMessageChannel', prefix: 'invalidMessageChannel: ' });

	});
}(document));
