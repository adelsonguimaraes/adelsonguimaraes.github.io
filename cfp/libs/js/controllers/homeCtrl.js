/*******************************************
		Controller de Home
*******************************************/
var homeCtrl = function ($scope, $rootScope, $location, genericAPI) {

	//verifica sessao
	if(!$rootScope.usuario) {
		// $location.path('/login');
		// return false;
	}

	// carosel
	$scope.slidePrev = function () {
		$('#myCarousel').carousel('prev');
	}
	$scope.slideNext = function () {
		$('#myCarousel').carousel('next');
	}
}


angular
	.module('cfp')
	.controller('homeCtrl', homeCtrl);