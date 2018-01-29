
var movimentacaoCtrl = function ( $rootScope, $scope, $location ) {
	
	//verifica sessao
	if(!$rootScope.usuario) {
		$location.path('/login');
		return false;
	};
};

angular.module( 'cfp' )
	.controller( 'movimentacaoCtrl', movimentacaoCtrl );