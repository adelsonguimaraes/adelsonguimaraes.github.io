/*******************************************
		Controller de Login
*******************************************/
var loginCtrl = function ($scope, $rootScope, $location, authenticationAPI, syncAPI) {

	//verifica sessao
	if($rootScope.usuario) {
		$location.path('/home');
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
				authenticationAPI.createSession(montDataSession(response.data), true);
				//logion error é escondido
				$scope.login.error = false;
				//redirecionamos para home
				$location.path('/home');
				window.location.replace('#/home');
				syncAPI.syncAllDB();
				$rootScope.stopLoad();
				$rootScope.verificaSenhaInicial();
			}else{
				if (navigator.onLine) {
					authenticationAPI.authentication(data)
					.then(function successCallback(response) {
						//se o sucesso === true
						if(response.data.success == true){
							//criamos a session
							authenticationAPI.createSession(montDataSession(response.data.data), true);//obj.infinity);
							// adiciona ao banco local
							console.log(response.data.data);
							adicionaUsuarioDBLocal(response.data.data);
							//logion error é escondido
							$scope.login.error = false;
							//redirecionamos para home
							$location.path('/home');
							syncAPI.syncAllDB();
							$rootScope.verificaSenhaInicial();
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

	function montDataSession (data) {
		let usuario = {
			idusuario: data.id,
			email: data.email, 
			nome: data.nome, 
			senha: data.senha, 
			perfil: data.perfil, 
			ativo: data.ativo, 
			inatividade: data.ativo
		};
		return usuario;
	}
}

angular
	.module('cfp')
	.controller('loginCtrl', loginCtrl);