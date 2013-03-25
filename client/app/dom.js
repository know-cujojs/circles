/*
 * Copyright 2012-2013 the original author or authors
 * @license MIT, see LICENSE.txt for details
 *
 * @author Brian Cavalier
 * @author Scott Andrews
 */

/**
 * dom
 * DOM utils
 */
(function (define) {
	define(function (require) {

		var curry;

		curry = require('./curry');

		/**
		 * Find the DOM node for an event
		 *
		 * @param event the event
		 * @returns {Node} the circle DOM node for the event
		 */
		function findCircleNode(event) {
			return event && document.getElementById(event.id);
		}

		/**
		 * Create a new circle from a template
		 *
		 * @returns {Node} a new circle DOM node
		 */
		function createCircleNode() {
			return document.getElementById('circle-template').cloneNode(false);
		}

		/**
		 * Posiion a DOM node at the x/y coords
		 *
		 * @param {number} [coords.x] the x position of the circle
		 * @param {number} [coords.y] the y position of the circle
		 * @param {Node} node the circle's DOM node
		 */
		function placeNode(coords, node) {
			if ('y' in coords) { node.style.top = coords.y + 'px'; }
			if ('x' in coords) { node.style.left = coords.x + 'px'; }
		}

		/**
		 * Add a CSS class to a DOM node
		 *
		 * @param {string} classname the CSS class to append
		 * @param {Node} node to append to
		 */
		function appendClass(classname, node) {
			if (node.className) {
				node.className = node.className + ' ' + classname;
			} else {
				node.className = classname;
			}
		}

		/**
		 * @returns {boolean} true if the DOM node is not defined for the touple
		 */
		function nodeIsMissing(pair) {
			return !pair[1];
		}

		/**
		 * Create a new DOM node for a touple
		 *
		 * @param {Array} pair event DOM node toupel
		 * @returns {Array} event DOM node touple with a DOM node
		 */
		function createNodeForPair(pair) {
			var node = createCircleFromInfo(pair[0]);
			document.body.appendChild(node);
			return [pair[0], node];
		}

		/**
		 * Create a new DOM node from circle info, applying a correlation id and
		 * color
		 *
		 * @param circleInfo the info representing the circle
		 * @returns {Node} the new DOM node
		 */
		function createCircleFromInfo(circleInfo) {
			var circleNode = createCircleNode();
			circleNode.id = circleInfo.id;
			circleNode.style.background = circleInfo.color;
			return circleNode;
		}

		/**
		 * Draw a click marker on the screen
		 *
		 * @param event the click event
		 */
		function addClickMarker(event) {
			var marker = event[1].cloneNode(false);
			marker.id = '';

			document.body.appendChild(marker);
			placeNode(event[0], marker);

			removeClickMarkerLater(marker);

			return marker;
		}

		/**
		 * Remove the DOM node in 500 ms
		 *
		 * @param {Node} marker the node to remove
		 */
		function removeClickMarkerLater(marker) {
			setTimeout(function () {
				document.body.removeChild(marker);
				marker.parentNode = null;
			}, 500);
		}

		return {
			findCircleNode: findCircleNode,
			createCircleNode: createCircleNode,
			placeNode: placeNode,
			appendClass: curry(appendClass),
			nodeIsMissing: nodeIsMissing,
			createNodeForPair: createNodeForPair,
			addClickMarker: addClickMarker,
			removeClickMarkerLater: removeClickMarkerLater
		};

	});
}(typeof define === 'function' ? define : function (factory) { module.exports = factory(require); }));
