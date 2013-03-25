/*
 * Copyright 2012-2013 the original author or authors
 * @license MIT, see LICENSE.txt for details
 *
 * @author Brian Cavalier
 * @author Scott Andrews
 */

/**
 * streams
 * Utilities for integrating clicks and streams
 */
(function (define) {
	define(function (require) {

		var curry, clicks;

		clicks = require('clicks');
		curry = require('./curry');

		/**
		 * Capture clicks events and stream them to the handler
		 *
		 * @param {Function} handler function to recieves events
		 */
		function initClicksStream(handler) {
			// attach defaults to dom level 3 events
			clicks.stream(handler).attach();
		}

		/**
		 * Discover if the event is of a particular type
		 *
		 * @param {string} type type of event (i.e. mousemove, click)
		 * @param event the event
		 * @returns true if the event is of the specified type
		 */
		function eventType(type, event) {
			return event.type && event.type.toLowerCase() === type;
		}

		/**
		 * Convert a raw event into the bare essentials
		 *
		 * @param event the event
		 * @returns a minimal event
		 */
		function toMinimalEvent(event) {
			return {
				type: event.type,
				timestamp: event.timestamp,
				x: event.clientX,
				y: event.clientY
			};
		}

		return {
			init: initClicksStream,
			byEventType: curry(eventType),
			toMinimalEvent: toMinimalEvent
		};

	});
}(typeof define === 'function' ? define : function (factory) { module.exports = factory(require); }));
