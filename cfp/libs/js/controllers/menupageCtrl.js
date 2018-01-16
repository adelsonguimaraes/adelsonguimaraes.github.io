
var menupageCtrl = function ( $rootScope, $scope, $location ) {
	
	//verifica sessao
	if(!$rootScope.usuario) {
		$location.path('/login');
		return false;
	};

	$scope.clickMenu = function (item) {
		var data = {
			'id': 1,
			'nome': 'Adelson Guimarães',
			'email': 'adelson@gmail.com',
			'senha': MD5('123'),
			'perfil':'USUARIO',
		};
		usuarioDAO.cadastrar(data).then(response => {
			if (response.success) {
				console.log(response);
			}else{
				console.log(response);
			}
		});
	};
};

angular.module( 'cfp' )
	.controller( 'menupageCtrl', menupageCtrl );