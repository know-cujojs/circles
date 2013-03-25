/*
 * Copyright 2012-2013 the original author or authors
 * @license MIT, see LICENSE.txt for details
 *
 * @author Scott Andrews
 * @author Brian Cavalier
 */

(function (curl) {

	var config = {
		baseUrl: '',
		pluginPath: 'curl/plugin',
		paths: {
			curl: 'lib/curl/src/curl',
			sockjs: 'lib/sockjs-0.3.min'
		},
		packages: [
			{ name: 'clicks', location: 'lib/clicks', main: 'clicks' },
			{ name: 'msgs', location: 'lib/msgs', main: 'msgs' },
			{ name: 'when', location: 'lib/when', main: 'when' }
		]
	};

	// load the main modules and kickstart the app
	curl(config, ['app/main']);

}(this.curl));
