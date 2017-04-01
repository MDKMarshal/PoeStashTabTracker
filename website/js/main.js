require.config({
	paths: {
		'domReady': '../lib/requirejs-domready/domReady',
		'angular': '../lib/angular/angular',
		'angular-route': '../lib/angular-route/angular-route',
		'jquery': '../lib/jquery/jquery',
		'bootstrap': '../lib/bootstrap/js/bootstrap',
		'bootstrap-toggle': '../lib/bootstrap-toggle/js/bootstrap-toggle',
		'text': '../lib/requirejs/text',
		'json': '../lib/requirejs/json',
	},
	shim: {
		'bootstrap': { 
			'deps': ['jquery'] 
		},
		'bootstrap-toggle': { 
			'deps': ['bootstrap']
		},
		'angular': { 
			'exports': 'angular',
			'deps': ['jquery']
		},
		'angular-route': { 
			'exports': 'ngRoute',
			'deps': ['angular']
		},
		'text': {'exports': 'text'}
	},
	baseUrl: './js'
});

require(['StashTracker'], function (StashTracker){
	StashTracker.init();
});