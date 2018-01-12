/*******************************************
		Controller de Despesa
*******************************************/
var contaCtrl = function ($scope, $rootScope, $location, genericAPI) {
    
        //verifica sessao
        // if(!$rootScope.usuario) {
        // 	$location.path('/login');
        // 	return false;
        // }
        
        function inciaScope () {
            $scope.conta = {
                "id":"",
                "idusuario":"",
                "descricao":"",
                "valor":"",
                "parcela":1,
                "indeterminada":"NAO",
                "tipo":"APAGAR",
                "status":"",
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
                "class":"conta"
            };
            genericAPI.generic(data)
            .then(function successCallback(response) {
                if( response.data.success === true ){
                    $scope.contas = response.data.data;
                }else{
                    console.log( response.data.msg );
                }
            }, function errorCallback(response) {
                //error
            });	
    
        }
        $scope.listarPorUsuario();
    
        $scope.editar = function (obj) {
            obj.datavencimento = moment(obj.datavencimento).format('DD/MM/YYYY');
            obj.parcela = parseInt(obj.parcela);
            $scope.conta = obj;
            $scope.novaDespesa();
        }
    
        $scope.salvar = function (obj) {
            
            obj.idusuario = $rootScope.usuario.idusuario;
            
            var metodo = "cadastrar";
            if(obj.id) metodo = "atualizar";
            
            obj.datavencimento = obj.datavencimento.substr(6)+'-'+obj.datavencimento.substr(3,2)+'-'+obj.datavencimento.substr(0,2);
    
            var data = {
                "metodo":metodo,
                "data":obj,
                "class":"conta"
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
                "class":"conta"
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
    
    angular
        .module('cfp')
        .controller('contaCtrl', contaCtrl);