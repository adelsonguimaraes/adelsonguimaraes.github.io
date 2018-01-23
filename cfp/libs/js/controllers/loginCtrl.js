/*******************************************
		Controller de Login
*******************************************/
var loginCtrl = function ($scope, $rootScope, $location, authenticationAPI) {

	//verifica sessao
	if($rootScope.usuario) {
		$location.path('/menu');
		return false;
	}
	
	/*
		Function que adiciona o usuário ao db local.
		Quando o usuário não existe em DB local o Sistema Recorre a Nuvem.
		Após o 1o login via Nuvem o sistema registra o usuário localmente.
	*/
	adicionaUsuarioDBLocal = function (data) {
		usuarioDAO.cadastrar(data).then(response => {
			if (response.success) {
				// console.log('Usuário adicionado ao DBLocal', data);
			}
		});
	};

	$scope.logar = function (obj) {
		$rootScope.startLoad();
		
		//desaativamos o login error com true
		$scope.login.error = false;

		var newObj = angular.copy(obj);

		// Encrypt senha
		newObj.senha = MD5(newObj.senha);
		
		var data = {
			"metodo":"logar",
			"data":newObj
		};

		// logando localmente 
		usuarioDAO.auth(newObj).then(response => {
			if (response.success) {
				//criamos a session
				response.data.idusuario = response.data.id;
				authenticationAPI.createSession(response.data, true);
				//logion error é escondido
				$scope.login.error = false;
				//redirecionamos para home
				$location.path('/menu');
				window.location.replace('#/menu');
				$rootScope.syncAllDB();
				$rootScope.stopLoad();
			}else{
				if (navigator.onLine) {
					authenticationAPI.authentication(data)
					.then(function successCallback(response) {
						//se o sucesso === true
						if(response.data.success == true){
							//criamos a session
							authenticationAPI.createSession(response.data.data, true);//obj.infinity);
							//logion error é escondido
							$scope.login.error = false;
							//redirecionamos para home
							$location.path('/menu');
							$rootScope.syncAllDB();
							adicionaUsuarioDBLocal(response.data.data);
						}else{
							//ativamos o login error com true
							$scope.login.error = true;
						}
						$rootScope.stopLoad();
					}, function errorCallback(response) {
						//error
					});	
				}else{
					//ativamos o login error com true
					$scope.login.error = true;
				}
			}
		});
		
	}
}

angular
	.module('cfp')
	.controller('loginCtrl', loginCtrl);