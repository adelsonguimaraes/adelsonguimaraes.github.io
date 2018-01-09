(function () {

	"use strict"

	var config = function ($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, IdleProvider, KeepaliveProvider) {
		$urlRouterProvider.otherwise("/home");

		$ocLazyLoadProvider.config({
	        // Set to true if you want to see what and when is dynamically loaded
	        debug: false
	    });

    	$stateProvider

	        .state('login', {
	            url: "/login",
	            templateUrl: "views/login.html",
	            controller: "loginCtrl",
	            data: { pageTitle: 'Login', specialClass: 'gray-bg'},
	        })
	        .state('home', {
	            url: "/home",
	            templateUrl: "views/home.html",
	            controller: "homeCtrl",
	            data: { pageTitle: 'Login', specialClass: 'gray-bg'},
	            resolve: {
	                loadPlugin: function ($ocLazyLoad) {
	                    return $ocLazyLoad.load([
	                       	{
	                            files: ['libs/js/plugins/moment/moment.min.js']
	                        }
	                    ]);
	                }
	            }
	        })
	        .state('despesa', {
	            url: "/despesa",
	            templateUrl: "views/despesa.html",
	            controller: "despesaCtrl",
	            data: { pageTitle: 'Login', specialClass: 'gray-bg'},
	            resolve: {
	                loadPlugin: function ($ocLazyLoad) {
	                    return $ocLazyLoad.load([
	                       	{
	                            files: ['libs/js/plugins/moment/moment.min.js']
	                        },
	                        {
	                            name: 'datePicker',
	                            files: ['libs/css/plugins/datapicker/angular-datapicker.css','libs/js/plugins/datapicker/angular-datepicker.js']
	                        },
	                    ]);
	                }
	            }
	        })
	        .state('recebimento', {
	            url: "/recebimento",
	            templateUrl: "views/recebimento.html",
	            controller: "recebimentoCtrl",
	            data: { pageTitle: 'Login', specialClass: 'gray-bg'},
	            resolve: {
	                loadPlugin: function ($ocLazyLoad) {
	                    return $ocLazyLoad.load([
	                       {
	                            files: ['libs/js/plugins/moment/moment.min.js']
	                        },
	                        {
	                            name: 'datePicker',
	                            files: ['libs/css/plugins/datapicker/angular-datapicker.css','libs/js/plugins/datapicker/angular-datepicker.js']
	                        },
	                    ]);
	                }
	            }
	        })

	        .state('fatura', {
	            url: "/fatura",
	            templateUrl: "views/fatura.html",
	            controller: "faturaCtrl",
	            data: { pageTitle: 'Login', specialClass: 'gray-bg'},
	            resolve: {
	                loadPlugin: function ($ocLazyLoad) {
	                    return $ocLazyLoad.load([
	                       {
	                            files: ['libs/js/plugins/moment/moment.min.js']
	                        },
	                        {
	                            name: 'datePicker',
	                            files: ['libs/css/plugins/datapicker/angular-datapicker.css','libs/js/plugins/datapicker/angular-datepicker.js']
	                        },
	                    ]);
	                }
	            }
	        });
	}

	angular
	    .module('cfp')
	    .config(config)
	    .run(function($rootScope, $state) {
	        $rootScope.$state = $state;
	    });

})();