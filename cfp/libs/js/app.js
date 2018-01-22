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
    
    /* Service Worker */
    if ( 'serviceWorker' in navigator ) {
        navigator.serviceWorker
        .register('./service-worker.js')
        .then((reg) => {
            console.log('Service Worker Registered');
        })
        .catch((err) => {
            console.log('erro', err);
        });
    }

})();