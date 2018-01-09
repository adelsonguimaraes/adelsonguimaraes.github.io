//controllers

(function () {
	
	"use strict"

	/*******************************************
			Controller Main
	*******************************************/
	var main = function ($location, $rootScope, authenticationAPI) {

	    var root = $rootScope;

	    root.api = "http://api.nuvio.com.br"; //variavel de api global
	    root.usuario = ""; //startando variavel global usuario

	    // authenticationAPI.verificaSessao();
	    authenticationAPI.sessionCtrl();

	}

	/*******************************************
			Controller de Login
	*******************************************/
	var login = function ($scope, $rootScope, $location, authenticationAPI) {

		//verifica sessao
		if($rootScope.usuario) {
			$location.path('/home');
			return false;
		}
		
		$scope.logar = function (obj) {
			var data = {
				"metodo":"logar",
				"data":obj
			};
			authenticationAPI.authentication(data)
				.then(function successCallback(response) {
		            //se o sucesso === true
					if(response.data.success == true){
		                //criamos a session
		            	authenticationAPI.createSession(response.data.data, obj.infinity);
		                //logion error é escondido
		                $scope.login.error = false;
		                //redirecionamos para home
		                $location.path('/home');
		            }else{
		                //ativamos o login error com true
		            	$scope.login.error = true;
		            }
		        }, function errorCallback(response) {
		        	//error
				});	
		}
	}

	/*******************************************
			Controller de Home
	*******************************************/
	var home = function ($scope, $rootScope, $location, genericAPI) {

		//verifica sessao
		if(!$rootScope.usuario) {
			$location.path('/login');
			return false;
		}

		var meses = [
			{"nome":"Janeiro",	"sigla":"JAN", "ano":"0000"},
			{"nome":"Fevereiro",	"sigla":"FEV", "ano":"0000"},
			{"nome":"Março", 		"sigla":"MAR", "ano":"0000"},
			{"nome":"Abril", 		"sigla":"ABRIL", "ano":"0000"},
			{"nome":"Maio",	 	"sigla":"MAIO", "ano":"0000"},
			{"nome":"Junho", 		"sigla":"JUN", "ano":"0000"},
			{"nome":"Julho", 		"sigla":"JUL", "ano":"0000"},
			{"nome":"Agosto", 	"sigla":"AGO", "ano":"0000"},
			{"nome":"Setembro", 	"sigla":"SET", "ano":"0000"},
			{"nome":"Outubro", 	"sigla":"OUT", "ano":"0000"},
			{"nome":"Novembro", 	"sigla":"NOV", "ano":"0000"},
			{"nome":"Dezembro", 	"sigla":"DEZ", "ano":"0000"}
		];

		$scope.periodos = [
			'3','4','5','6','7','8','9','10','11','12'
		];

		$scope.tlmeses = '3';
		function carregaMeses () {
			$scope.meses = [];

			var now = new Date();
			var count = now.getMonth();
			var total = count + parseInt($scope.tlmeses);
			var ano = moment().year();

			while (count < 12) {
				meses[count].ano = ano;
				$scope.meses.push(meses[count]);
				count++;
			}
			var resto = total - count;
			count = 0;
			while (count < resto) {
				meses[count].ano = ano+1;
				$scope.meses.push(meses[count]);
				count++;
			}
		}
		carregaMeses ();

		function totaisValor () {
			$scope.totais = [];
			$scope.totalgeral = 0;
			for ( var i=0; i<$scope.tlmeses; i++ ) {
				$scope.totais.push({"valor":0});
			}
		};
		totaisValor();

		$scope.despesas = [
			// {"descricao":"Tênis", "valor":"90.00", "prestacoes":"5", "datavencimento":"2016-07-05"},
			// {"descricao":"Mouse Razor", "valor":"150", "prestacoes":"3", "datavencimento":"2016-07-05"},
			// {"descricao":"Carro", "valor":"450", "prestacoes":"25", "datavencimento":"2016-07-01"},
			// {"descricao":"Bolsa", "valor":"70", "prestacoes":"1", "datavencimento":"2016-07-08"},
			// {"descricao":"Oculos", "valor":"180", "prestacoes":"2", "datavencimento":"2016-07-20"},
			// {"descricao":"Notebook", "valor":"2000", "prestacoes":"10", "datavencimento":"2016-07-15"},
			// {"descricao":"Meia", "valor":"500", "prestacoes":"7", "datavencimento":"2016-09-15"}
		];

		$scope.listarDespesaPorUsuario = function () {
			var data = {
				"metodo":"listarPorUsuario",
				"class":"despesa"
			};
			genericAPI.generic(data)
			.then(function successCallback(response) {
				if( response.data.success === true ){
		        	$scope.despesas = response.data.data;
		        	ordenaDatas( $scope.despesas );
		        	montaValorMes();
		        }else{
		        	alert( response.data.msg );
		        }
	        }, function errorCallback(response) {
	        	//error
			});	

		}
		$scope.listarDespesaPorUsuario();

		function ordenaDatas (despesas) {
			var datas = despesas;
			var array = [];
			while (datas.length > 0) {
				var num = {"datavencimento":"9999/12/31"};
				var pos = 0;
				for (var x in datas) {
					if (moment(datas[x].datavencimento).date() < moment(num.datavencimento).date()) {
						num = datas[x];
						num.diavencimento = num.datavencimento.substr(8,2);
						pos = x;
					}
				}
				array.push(num);
				datas.splice( pos, 1 );
			}
			$scope.despesas = array;
		}
		
		// construindo tabelas de mes

		function montaValorMes () {
			// laco de despesas
			for (var x in $scope.despesas) {
				// separo a despesa
				var despesa = $scope.despesas[x];
				// crio um atributo pres(array) na despesa
				despesa.pres = [];

				// laco de meses até 8
				// for (var m=0; m<8; m++) {
				for (var m=0; m<$scope.tlmeses; m++) {
					var day = moment().add(m, "M").date(); // dia atual + 1
					var month = moment().add(m, "M").month(); // mes atual + 1
					var year = moment().add(m, "M").year(); // ano atual + 1
					var data = ''; // variavel data

					// laco de prestacoes da despesa
					for (var p=0; p<despesa.prestacoes; p++) {
						var dia = moment(despesa.datavencimento).add(p, "M").date(); // dia da data despesa + index
						var mes = moment(despesa.datavencimento).add(p, "M").month(); // mes data despesa + index
						var ano = moment(despesa.datavencimento).add(p, "M").year(); // ano data despesa + index
						
						// caso o mes e ano da despesa seja = ao mes e ano atual 
						if (mes === month && ano === year) {
							data = {"data": mes+"/"+ano, "valor":despesa.valor};
							// pegando a prestação atual
							if (m === 0) { // m = o ( mes atual )
								despesa.prestacao = (p+1)+"/"+despesa.prestacoes;
							}
						}
					}

					if (!despesa.prestacao) {
						// se ano = atual mas mes menor ou ano menor
						if ( (ano === year && mes < month) || (ano < year) ) {
							despesa.prestacao = despesa.prestacoes+"/"+despesa.prestacoes;
						}else{
							despesa.prestacao = "0/"+despesa.prestacoes;
						}
					}

					if ( data === '' ) {
						despesa.pres.push({"data": "00/0000", "valor":"xxxx", "color":"background:#f0f5f5; color:#ccc;", "icon":"fa-trophyx"});
					}else{
						despesa.pres.push(data);
						$scope.totais[m].valor = $scope.totais[m].valor +  parseInt(despesa.valor);
						
						if($scope.totais[m-1] != undefined && $scope.totais[m].valor < $scope.totais[m-1].valor) {
							$scope.totais[m].icon = "fa-arrow-down";
						}else if($scope.totais[m-1] != undefined && $scope.totais[m].valor > $scope.totais[m-1].valor) {
							$scope.totais[m].icon = "fa-arrow-up";
						}else{
							$scope.totais[m].icon = "fa-arrow-right";
						}
					}
				}

				$scope.totalgeral = $scope.totalgeral + parseFloat(despesa.valor);
			}
		}

		$scope.changeTlMeses = function () {
			$scope.meses = [];
			carregaMeses();
			totaisValor();
			ordenaDatas( $scope.despesas );
			montaValorMes();
		};
	}

	/*******************************************
			Controller de Despesa
	*******************************************/
	var despesa = function ($scope, $rootScope, $location, genericAPI) {

		//verifica sessao
		if(!$rootScope.usuario) {
			$location.path('/login');
			return false;
		}
		
		function inciaScope () {
			$scope.despesa = {
				"id":"",
				"descricao":"",
				"valor":"",
				"quantidade":1,
				"prestacoes":1,
				"dataaquisicao": moment().format('DD/MM/YYYY'),
				"datavencimento": moment().format('DD/MM/YYYY')
			}
			$scope.nova = false;
		}
		inciaScope();

		$scope.novaDespesa = function () {
			$scope.nova = true;
		}

		$scope.listarPorUsuario = function () {
			var data = {
				"metodo":"listarPorUsuario",
				"class":"despesa"
			};
			genericAPI.generic(data)
			.then(function successCallback(response) {
				if( response.data.success === true ){
		        	$scope.despesas = response.data.data;
		        }else{
		        	alert( response.data.msg );
		        }
	        }, function errorCallback(response) {
	        	//error
			});	

		}
		$scope.listarPorUsuario();

		$scope.editar = function (obj) {
			obj.dataaquisicao = moment(obj.dataaquisicao).format('DD/MM/YYYY');
			obj.datavencimento = moment(obj.datavencimento).format('DD/MM/YYYY');
			obj.quantidade = parseInt(obj.quantidade);
			obj.prestacoes = parseInt(obj.prestacoes);
			$scope.despesa = obj;
			$scope.novaDespesa();
		}

		$scope.salvar = function (obj) {
			
			obj.idusuario = $rootScope.usuario.idusuario;
			
			var metodo = "cadastrar";
			if(obj.id) metodo = "atualizar";
			
			obj.dataaquisicao = obj.dataaquisicao.substr(6)+'-'+obj.dataaquisicao.substr(3,2)+'-'+obj.dataaquisicao.substr(0,2);
			obj.datavencimento = obj.datavencimento.substr(6)+'-'+obj.datavencimento.substr(3,2)+'-'+obj.datavencimento.substr(0,2);

			var data = {
				"metodo":metodo,
				"data":obj,
				"class":"despesa"
			};
			genericAPI.generic(data)
				.then(function successCallback(response) {
					//success
					inciaScope();
					$scope.listar();
		        }, function errorCallback(response) {
		        	//error
				});	
		}

		$scope.deletar = function (obj) {
			
			var data = {
				"metodo":"deletar",
				"data":obj,
				"class":"despesa"
			};
			genericAPI.generic(data)
				.then(function successCallback(response) {
					if( response.data.success === true ){
			        	inciaScope();
						$scope.listar();
			        }else{
			        	alert( response.data.msg );
			        }
		        }, function errorCallback(response) {
		        	//error
				});	
		}

		$scope.cancelar = function () {
			inciaScope();
		}
	}

	/*******************************************
			Controller de Recebimento
	*******************************************/
	var recebimento = function ($scope, $rootScope, $location, genericAPI) {
		
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

		$scope.listarPorUsuario = function () {
			var data = {
				"metodo":"listar",
				"class":"recebimento"
			};
			genericAPI.generic(data)
			.then(function successCallback(response) {
				if( response.data.success === true ){
		        	$scope.recebimentos = response.data.data;
		        }else{
		        	alert( response.data.msg );
		        }
	        }, function errorCallback(response) {
	        	//error
			});	

		}
		$scope.listarPorUsuario();

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
					if ( response.data.success === true ) {
						startScope();
						$scope.listar();
					}else{
						alert( response.data.msg );
					}
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
					if ( response.data.success === true ) {
						startScope();
						$scope.listar();
					}else{
						alert( response.data.msg );
					}
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
		.controller('mainCtrl', main)
		.controller('loginCtrl', login)
		.controller('homeCtrl', home)
		.controller('despesaCtrl', despesa)
		.controller('recebimentoCtrl', recebimento);

})();