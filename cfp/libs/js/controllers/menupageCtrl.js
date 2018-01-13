
var menupageCtrl = function ( $rootScope, $scope, $location ) {
	
	//verifica sessao
	if(!$rootScope.usuario) {
		$location.path('/login');
		return false;
	};

	$scope.clickMenu = function (item) {
		console.log( item );
	};
};

angular.module( 'cfp' )
	.controller( 'menupageCtrl', menupageCtrl );