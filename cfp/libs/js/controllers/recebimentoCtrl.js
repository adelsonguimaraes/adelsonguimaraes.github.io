/*******************************************
		Controller de Recebimento
*******************************************/
var recebimentoCtrl = function ($scope, $rootScope, $location, genericAPI) {
	
	//verifica sessao
	if(!$rootScope.usuario) {
		$location.path('/login');
		return false;
	}

	function startScope () {
		$scope.recebimento = {
			"id":"",
			"descricao":"",
			"valor":"",
			"dataarrecadacao":moment().format('DD/MM/YYYY'),
			"tipo":"UNICO",
			"ativo":"sim"
		}
		$scope.novo = false;
	}
	startScope();

	$scope.novoRecebimento = function () {
		$scope.novo = true;
	}

	$scope.listar = function () {
		var data = {
			"metodo":"listar",
			"class":"recebimento"
		};
		genericAPI.generic(data)
			.then(function successCallback(response) {
				if(response.data.length>0){
		        	$scope.recebimentos = response.data;
		        }
	        }, function errorCallback(response) {
	        	//error
			});	

	}
	$scope.listar();

	$scope.editar = function (obj) {
		obj.dataarrecadacao = moment(obj.dataarrecadacao).format('DD/MM/YYYY');
		$scope.recebimento = obj;
		$scope.novoRecebimento();
	}

	$scope.salvar = function (obj) {
		
		obj.idusuario = $rootScope.usuario.idusuario;
		
		var metodo = "cadastrar";
		if(obj.id) metodo = "atualizar";

		obj.dataarrecadacao = obj.dataarrecadacao.substr(6)+'-'+obj.dataarrecadacao.substr(3,2)+'-'+obj.dataarrecadacao.substr(0,2);
		
		var data = {
			"metodo":metodo,
			"data":obj,
			"class":"recebimento"
		};
		genericAPI.generic(data)
			.then(function successCallback(response) {
				//success
				startScope();
				$scope.listar();
	        }, function errorCallback(response) {
	        	//error
			});	
	}

	$scope.deletar = function (obj) {
		
		var data = {
			"metodo":"deletar",
			"data":obj,
			"class":"recebimento"
		};
		genericAPI.generic(data)
			.then(function successCallback(response) {
				//success
				startScope();
				$scope.listar();
	        }, function errorCallback(response) {
	        	//error
			});	
	}

	$scope.cancelar = function () {
		startScope();
	}
}

angular
	.module('cfp')
	.controller('recebimentoCtrl', recebimentoCtrl);