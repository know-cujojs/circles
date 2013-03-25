/*
 * Copyright 2012-2013 the original author or authors
 * @license MIT, see LICENSE.txt for details
 *
 * @author Scott Andrews
 */

/**
 * colorGenerator
 * Create a color definition that is random, but also not too dark or bright
 */
(function (define) {
	define(function () {

		function randomIntBetween(low, high) {
			high = high + 1;
			return Math.floor(Math.random() * (high - low)) + low;
		}

		/**
		 * Generate a random color that's not too dark or bright
		 *
		 * @returns {string} a CSS compatible color defintion
		 */
		return function colorGenerator() {
			return [
				'hsl(',
				randomIntBetween(0, 359),
				', ',
				randomIntBetween(35, 100),
				'%, ',
				randomIntBetween(35, 100),
				'%)'
			].join('');
		};

	});
}(typeof define === 'function' ? define : function (factory) { module.exports = factory(); }));
