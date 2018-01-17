
var menupageCtrl = function ( $rootScope, $scope, $location ) {
	
	//verifica sessao
	if(!$rootScope.usuario) {
		$location.path('/login');
		return false;
	};

	$scope.clickMenu = function (item) {
		var data = {
			'id': 1,
			'nome': 'Adelson Guimarães Monteiro',
			'email': 'adelson@gmail.com',
			'senha': MD5('123'),
			'perfil':'USUARIO',
		};
		categoriaDAO.listarPorTipo('ARECEBER').then(list => {
			console.log(list);
		});
	};
};

angular.module( 'cfp' )
	.controller( 'menupageCtrl', menupageCtrl );