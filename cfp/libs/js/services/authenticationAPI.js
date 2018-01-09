//service
(function () {

	"use strict"

	angular.module('cfp').service("authenticationAPI", function ($q, $location, $rootScope, $http) {
	
		function _authentication (data) {
			return $http({
				method: 'POST',
				url: "src/rest/authentication.php",
				data: {
					metodo: data.metodo,
					data: data.data
				}
			});
		};


		function _createSession (data, infinity) {
			//verifica se o cookie não foi marcado
			if(!infinity) infinity = false;
			//alimenta a variavel usuario com data;
			$rootScope.usuario = data;
			//criar a sessionStorage com oss dados do data
	        sessionStorage["usuario"] = JSON.stringify(data);
	        //cria obj Date com a data atual
	        var now = new Date();
	        //criar o obj do localStorage sessionCFP
	        var sessionCFP = {
	            "usuario": 	data, //alimenta os dados da session usuario
	            "infinity": infinity, //passa true ou false para o cookie infinito
	            "dataExp": 	new Date(now.getTime()+50000) //passa a data atual + 1 minuto para dataExp
	        };

	        //cria o local storage
	        localStorage["sessionCFP"] = JSON.stringify(sessionCFP);
	    }

		function _sessionCtrl () {

			
			/*
				Function generica para as várias operaçõesss abaixo
			*/
			function atualizaLocalStorage () {
				//converte json string para obj e armazena em session.
				var session = JSON.parse(localStorage['sessionCFP']);
				//cria um novo obj de data atual
				var now = new Date();
				//atualiza o tempo da sessão, a hora atual +5 minutos
				session.dataExp = new Date(now.getTime()+50000);
				//atualiza a sessionStorage mynuvio cupom
				localStorage['sessionCFP'] = JSON.stringify(session);
				//converte o obj em json string e salva em sessionStorage
				sessionStorage['usuario'] = JSON.stringify(session.usuario);
				//converte json string para obj e passa para o scopo usuario
				$rootScope.usuario = JSON.parse(sessionStorage['usuario']);
			}

			/*
				Verifica se existe sessionStore.usuario
			*/
			if(sessionStorage['usuario']) {

				atualizaLocalStorage();
				
			/*
				Caso não exista sessionStorage
			*/
			}else{
				/*
					Verifica se existe localStorage
				*/
				if(localStorage['sessionCFP']) {
					//converte json string para obj e armazena em session.
					var session = JSON.parse(localStorage['sessionCFP']);
					/*
						Verifica se a sessão tem conf infinita,
						sendo que o usuario está sempre logado
					*/
					if(session.infinity) {

						atualizaLocalStorage();

					}else{
						//cria um novo obj de data atual
						var now = new Date();
						//converte a string data da sessao em obj
						var dataSessao = new Date(session.dataExp);
						/*
							Compara se o tempo de sessão ainda está no prazo,
							convertendo as duas datas em milisegundos
						*/
						if(now.getTime() <= dataSessao.getTime()) {
							
							atualizaLocalStorage();
						
						}else{
						
							$rootScope.logout();
						
						}//fim if data.getTime
					}//fim if session infinity
				}//fim de if localStorage
			}//fim if sessionStorage

		}

		// logout global
	    $rootScope.logout = function () {

	    	if($rootScope.usuario) {
	        	$http({
	        		method: "POST",
	        		url: "rest/autoload.php",
	        		data: {metodo: "logout", class: "authentication"}
	        	}).then(function successCallback(response) {
		        	if(response.data) {

		        		window.sessionStorage.removeItem("usuario");
		        		window.localStorage.removeItem("sessionCFP");
		        		$rootScope.usuario = "";
						//delete $rootScope.menus;
		        		$location.path("/login");
		        	}
		        });	
	        };
	    }

		return {
			authentication: _authentication,
			// verificaSessao : _verificaSessao,
			createSession: _createSession,
			sessionCtrl: _sessionCtrl
		};
	});

})();