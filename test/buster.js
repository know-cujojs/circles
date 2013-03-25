/*
 * Copyright 2012-2013 the original author or authors
 * @license MIT, see LICENSE.txt for details
 *
 * @author Scott Andrews
 */

(function () {

	var config = {};

	config['client:node'] = {
		environment: 'node',
		rootPath: '../',
		tests: ['client/test/**/*-test.js']
	};

	config['server:node'] = {
		environment: 'node',
		rootPath: '../',
		tests: ['server/test/**/*-test.js']
	};

	if (typeof module !== 'undefined') {
		module.exports = config;
	}

})();