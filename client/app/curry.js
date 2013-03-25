/*
 * Copyright 2012-2013 the original author or authors
 * @license MIT, see LICENSE.txt for details
 *
 * @authro Brian Cavalier
 * @author Scott Andrews
 */

/**
 * curry
 * A multi-arg friendly currying function
 */
(function (define) {
	define(function () {

		var slice = Array.prototype.slice;

		function curryNext(fn, arity, args) {
			return function () {
				var accumulated = args.concat(slice.call(arguments));

				return accumulated.length < arity ?
					curryNext(fn, arity, accumulated) :
					fn.apply(this, accumulated);
			};
		}

		/**
		 * Curry a functions formal parameters until they have been fully applied,
		 * then execute the function as if the param were applied all at once.
		 *
		 * function add(a, b) { return a + b; }
		 * var plusOne = curry(add, 1);
		 * plusOne(3); // 4
		 * plusOne(2); // 3
		 *
		 * @param {Function} fn the function to curry
		 * @param {*...} [args] default params to curry
		 * @return {Function} curried function
		 */
		return function curry(fn /*, args... */) {
			return curryNext(fn, fn.length, slice.call(arguments, 1));
		};

	});
}(typeof define === 'function' ? define : function (factory) { module.exports = factory(); }));
