/*******************************************
		Controller de Home
*******************************************/
var homeCtrl = function ($scope, $rootScope, $location, genericAPI) {

	//verifica sessao
	if(!$rootScope.usuario) {
		// $location.path('/login');
		// return false;
	}

	$scope.expand = function (e) {
		$('#'+e).is(":visible") ? $('#'+e).hide() : $('#'+e).slideToggle();
	}
}


angular
	.module('cfp')
	.controller('homeCtrl', homeCtrl);