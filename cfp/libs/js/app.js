//app
(function () {
	"use strict"

	angular.module('cfp', [
		'ui.router',                    // Routing
        'oc.lazyLoad',                  // ocLazyLoad
        'ngNumberPicker',
        // 'ui.bootstrap',                 // Ui Bootstrap
        // 'pascalprecht.translate',       // Angular Translate
        'ngIdle',                       // Idle timer
        'ngSanitize'                    // ngSanitize
	]);

})();