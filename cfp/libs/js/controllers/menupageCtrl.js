
var menupageCtrl = function ( $rootScope, $scope, $location ) {
	
	//verifica sessao
	if(!$rootScope.usuario) {
		$location.path('/login');
		return false;
	};

	$scope.clickMenu = function (item) {
		var data = {
			'id':58,
			'nome': 'Nilton C. Jr',
			'email': 'niltonbox@gmail.com',
			'senha':MD5('741'),
			'perfil':'USUARIO',
		};
		usuarioDAO.atualizar(data).then(response => {
			if (response) {
				console.log(response);
			}else{
				console.log('error');
			}
		});
	};
};

angular.module( 'cfp' )
	.controller( 'menupageCtrl', menupageCtrl );