(function () {

	"use strict"

	var config = function ($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, IdleProvider, KeepaliveProvider) {
		$urlRouterProvider.otherwise("/home");

		// $ocLazyLoadProvider.config({
	    //     // Set to true if you want to see what and when is dynamically loaded
	    //     debug: false
	    // });

    	$stateProvider

	        .state('login', {
				cache: false,
	            url: "/login",
	            templateUrl: "views/login.html",
	            controller: "loginCtrl",
	            data: { pageTitle: 'Login', specialClass: 'gray-bg'},
			})
			.state('alterarsenha', {
				cache: false,
	            url: "/alterarsenha",
	            templateUrl: "views/alterarsenha.html",
	            controller: "alterarsenhaCtrl",
	            data: { pageTitle: 'Alteração de Senha', specialClass: 'gray-bg'},
	        })
	        .state('home', {
				cache: false,
	            url: "/home",
	            templateUrl: "views/home.html",
	            controller: "homeCtrl",
	            data: { pageTitle: 'Home', specialClass: 'gray-bg'}
			})
			.state('cronograma', {
				cache: false,
	            url: "/cronograma",
	            templateUrl: "views/cronograma.html",
	            controller: "cronogramaCtrl",
	            data: { pageTitle: 'Cronograma', specialClass: 'gray-bg'}
	            // resolve: {
	            //     loadPlugin: function ($ocLazyLoad) {
	            //         return $ocLazyLoad.load([
	            //            	{
	            //                 files: ['libs/js/plugins/moment/moment.min.js']
	            //             }
	            //         ]);
	            //     }
	            // }
	        })
	        .state('apagar', {
				cache: false,
	            url: "/apagar",
	            templateUrl: "views/contaapagar.html",
	            controller: "contaCtrl",
	            data: { pageTitle: 'Despesas', specialClass: 'gray-bg'}
	            // resolve: {
	            //     loadPlugin: function ($ocLazyLoad) {
	            //         return $ocLazyLoad.load([
	            //            	{
	            //                 files: ['libs/js/plugins/moment/moment.min.js']
	            //             },
	            //             {
	            //                 name: 'datePicker',
	            //                 files: ['libs/css/plugins/datapicker/angular-datapicker.css','libs/js/plugins/datapicker/angular-datepicker.js']
	            //             },
	            //         ]);
	            //     }
	            // }
	        })
	        .state('areceber', {
				cache: false,
	            url: "/areceber",
	            templateUrl: "views/contaareceber.html",
	            controller: "contaCtrl",
	            data: { pageTitle: 'Recebimentos', specialClass: 'gray-bg'}
	            // resolve: {
	            //     loadPlugin: function ($ocLazyLoad) {
	            //         return $ocLazyLoad.load([
	            //            {
	            //                 files: ['libs/js/plugins/moment/moment.min.js']
	            //             },
	            //             {
	            //                 name: 'datePicker',
	            //                 files: ['libs/css/plugins/datapicker/angular-datapicker.css','libs/js/plugins/datapicker/angular-datepicker.js']
	            //             },
	            //         ]);
	            //     }
	            // }
			})
			.state('emaberto', {
				cache: false,
	            url: "/emaberto",
	            templateUrl: "views/contasemaberto.html",
	            controller: "contasemabertoCtrl",
	            data: { pageTitle: 'Contas em Aberto', specialClass: 'gray-bg'}
	        })

	        .state('menupage', {
				cache: false,
	            url: "/menu",
	            templateUrl: "views/menupage.html",
	            controller: "menupageCtrl",
	            data: { pageTitle: 'Login', specialClass: 'gray-bg'}
	            // resolve: {
	            //     loadPlugin: function ($ocLazyLoad) {
	            //         return $ocLazyLoad.load([
	            //            {
	            //                 files: ['libs/js/plugins/moment/moment.min.js']
	            //             },
	            //             {
	            //                 name: 'datePicker',
	            //                 files: ['libs/css/plugins/datapicker/angular-datapicker.css','libs/js/plugins/datapicker/angular-datepicker.js']
	            //             },
	            //         ]);
	            //     }
	            // }
			})
			
			.state('movimentacao', {
				cache: false,
				url: "/movimentacao",
				templateUrl: "views/movimentacao.html",
				controller: "movimentacaoCtrl",
				data: { pageTitle: 'Movimentação', specialClass: 'gray-bg'}
			})
	}

	angular
	    .module('cfp')
	    .config(config)
	    .run(function($rootScope, $state) {
	        $rootScope.$state = $state;
	    });

})();