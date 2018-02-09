/*******************************************
		Controller de AlterarSenha
*******************************************/
var alterarsenhaCtrl = function ($scope, $rootScope, $location, genericAPI, $timeout) {
    
        //verifica sessao
        if(!$rootScope.usuario) {
        	$location.path('/login');
        	return false;
        }

        function iniciaScope () {
            $scope.auth = {
                "idusuario":'',
                "senhaatual":'',
                "senhanova":'',
                "confirmasenha":''
            };
            $scope.nova = false;
            
        }
        iniciaScope();
    
        $scope.novaAlterarSenha = function () {
            $scope.nova = true;
        }
    
        $scope.salvar = function (obj) {
            var newObj = angular.copy(obj);

            if ( MD5(newObj.senhaatual) !== $rootScope.usuario.senha ) {
                alert('A senha atual é inválida!');
                return false;
            }

            if ( newObj.novasenha === newObj.senhaatual ) {
                alert('Por favor, escolha uma senha diferente da atual!');
                return false;
            }

            if ( newObj.novasenha !== newObj.confirmasenha ) {
                alert('A confirmação de senha difere da nova senha!');
                return false;
            }

            newObj.id = $rootScope.usuario.idusuario;

            $rootScope.startLoad();
            
            // se tem suporte para indexeddb
            if (indexedDBCtrl.support) {
                usuarioDAO['atualizarSenha'](newObj).then(response => {
                    if (response.success) {
                        $rootScope.stopLoad();
                    }
                });
                // return false;
            };

            
            // se há internet
            if (!navigator.onLine) return false;
            
            $rootScope.startLoad();

            var data = {
                "metodo":'atualizar',
                "data":newObj,
                "class":"usuario"
            };
            genericAPI.generic(data)
                .then(function successCallback(response) {
                    $rootScope.stopLoad();
                    $rootScope.logout();
                }, function errorCallback(response) {
                    //error
                });	
        }
    
        $scope.cancelar = function () {
            window.location.replace('./');
        }
    }
    
    angular
        .module('cfp')
        .controller('alterarsenhaCtrl', alterarsenhaCtrl);