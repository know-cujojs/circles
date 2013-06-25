/*
 * Copyright (c) 2012-2013 VMware, Inc. All Rights Reserved.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 */

module.exports = function (grunt) {

	var fs, json5;

	fs = require('fs');
	json5 = require('json5');

	// Project configuration.
	grunt.initConfig({
		lint: {
			files: ['grunt.js', 'client/app/**/*.js', 'server/**/*.js']
		},

		jshint: {
			options: json5.parse('' + fs.readFileSync('.jshintrc'))
		},

		// Unfortunately, it seems that the grunt-css plugin
		// is broken.  Leaving this in for now in hopes that it
		// gets fixed at some point.
		csslint: {
			files: ['client/app/**/*.css']
		},

		// Unfortunately, it seems that the grunt-html plugin
		// is broken.  Leaving this in for now in hopes that it
		// gets fixed at some point.
		htmllint: {
			all: ['client/app/**/*.html']
		},

		server: {
			module: './server/main'
		},

		// it'd be nice if there were more magic here:
		'config-amd': {
			// appDir tells us where run.js is on the file system
			// so we can update it.
			appDir: 'client/app',
			// libDir is where the third-party libs reside on the file system.
			// leave this blank to get this from volo.baseUrl:
			libDir: 'client/lib',
			// webRoot is where index.html resides on the file system.
			// this is used to map file system folders to web paths.
			webRoot: 'client'
		},

		buster: {
			test: {
				config: 'test/buster.js'
			}
		},

		watch: {
			files: '<config:lint.files>',
			tasks: 'default'
		}

	});

	grunt.loadNpmTasks('grunt-buster');
	grunt.loadNpmTasks('grunt-css');
	grunt.loadNpmTasks('grunt-html');
	grunt.loadNpmTasks('grunt-contrib-jshint');

	// Use buster for testing
	grunt.registerTask('test', 'buster');

	// csslint and htmllint appears to be broken, don't use it yet.
	// grunt.registerTask('lintall', ['lint', 'csslint', 'htmllint']);
	grunt.registerTask('lintall', ['jshint']);

	grunt.registerTask('default', ['lintall','test']);

};