module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		copy: {
			"website-libs": {
				expand: true,
				cwd: 'website/node_modules',
				src: [
					'angular/angular.js',
					'angular-route/angular-route.js',
					'angular-cookies/angular-cookies.js',
					'requirejs/require.js',
					'requirejs-domready/domReady.js'
				],
				dest: 'website/lib'
			},
			"website-libs-requirejs-json": {
				expand: true,
				cwd: 'website/node_modules/requirejs-plugins/src',
				src: 'json.js',
				dest: 'website/lib/requirejs'
			},
			"website-libs-requirejs-text": {
				expand: true,
				cwd: 'website/node_modules/requirejs-text',
				src: 'text.js',
				dest: 'website/lib/requirejs'
			},
			"website-libs-jquery": {
				expand: true,
				cwd: 'website/node_modules/jquery/dist',
				src: 'jquery.js',
				dest: 'website/lib/jquery'	
			},
			"website-libs-bootstrap": {
				expand: true,
				cwd: 'website/node_modules/bootstrap/dist',
				src: [
					'js/bootstrap.js',
					'css/bootstrap.css',
					'fonts/*'
				],
				dest: 'website/lib/bootstrap'
			},
			"website-libs-bootstrap-toggle": {
				expand: true,
				cwd: 'website/node_modules/bootstrap-toggle',
				src: [
					'js/bootstrap-toggle.js',
					'css/bootstrap-toggle.css'
				],
				dest: 'website/lib/bootstrap-toggle'	
			},
		}
	});

	grunt.loadNpmTasks('grunt-contrib-copy');

	grunt.registerTask('server', function(){
		grunt.util.spawn({
			cmd: 'node',
			args: ['server.js'],
			opts: {
				cwd: 'server'
			}
		});
	});

	grunt.registerTask('copy-website', [
		'copy:website-libs', 
		'copy:website-libs-requirejs-json',
		'copy:website-libs-requirejs-text',
		'copy:website-libs-jquery',
		'copy:website-libs-bootstrap',
		'copy:website-libs-bootstrap-toggle'
	]);

	grunt.registerTask('default', 'copy-website');
}