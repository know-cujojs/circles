/*
 * Copyright 2012-2013 the original author or authors
 * @license MIT, see LICENSE.txt for details
 *
 * @author Brian Cavalier
 * @author Scott Andrews
 */

/**
 * circles
 * Add and move circles in response to stream events
 */
(function (define, document) {
	define(function (require) {

		var curry, dom;

		curry = require('./curry');
		dom = require('./dom');

		/**
		 * Pair a circle with the event as a touple
		 *
		 * @param item the circle
		 * @param event the clicks event
		 * @returns {Array} touple of the event and item
		 */
		function pairWith(item, event) {
			return [event, item];
		}

		/**
		 * Transform the cirlce info and the event into a augmented synthetic event
		 *
		 * @param info the cirlce info
		 * @param event the event
		 * @returns a synthetic event combining the circle info and event properties
		 */
		function addInfo(info, event) {
			return {
				id: info.id,
				color: info.color,
				timestamp: event.timestamp,
				type: event.type,
				x: event.x,
				y: event.y
			};
		}

		/**
		 * Correlate the event with it's DOM node
		 *
		 * @param {Function} findCircleNode strategy for finding the node
		 * @param event the event
		 * @returns {Array} touple of the event and circle DOM node
		 */
		function findCircle(findCircleNode, event) {
			return [event, findCircleNode(event)];
		}

		/**
		 * Create a circle DOM node for a new user
		 *
		 * @param {Function} createCircleNode strategy to create a new circle for an
		 *   event
		 * @param event the event
		 * @returns {Array} touple of the event and circle DOM node
		 */
		function createIfMissing(createCircleNode, event) {
			var node = event[1];
			if (node) {
				node = createCircleNode(event[0]);
				document.body.appendChild(node);
			}

			return [event[0], node];
		}

		/**
		 * Move the circle on the screen to the event coordinates
		 *
		 * @param {Array} event touple of the event and circle DOM node
		 */
		function moveCircle(event) {
			dom.placeNode.apply(null, event);
		}

		return {
			addInfo: curry(addInfo),
			move: moveCircle,
			find: curry(findCircle),
			createIfMissing: curry(createIfMissing),
			pairWith: curry(pairWith)
		};

	});
}(
	typeof define === 'function' ? define : function (factory) { module.exports = factory(require); },
	document
));
