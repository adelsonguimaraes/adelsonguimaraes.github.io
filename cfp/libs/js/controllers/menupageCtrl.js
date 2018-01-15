
var menupageCtrl = function ( $rootScope, $scope, $location ) {
	
	//verifica sessao
	if(!$rootScope.usuario) {
		$location.path('/login');
		return false;
	};

	$scope.clickMenu = function (item) {
		console.log(usuarioDAO.autoIncrementID());
	};
};

angular.module( 'cfp' )
	.controller( 'menupageCtrl', menupageCtrl );