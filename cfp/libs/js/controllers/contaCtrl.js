/*******************************************
		Controller de Conta
*******************************************/
var contaCtrl = function ($scope, $rootScope, $location, genericAPI) {
    
        //verifica sessao
        if(!$rootScope.usuario) {
        	$location.path('/login');
        	return false;
        }

        $scope.dataatual = moment().format('YYYY-MM-DD');
        
        function inciaScope () {
            $scope.conta = {
                "id":"",
                "idusuario":"",
                "idcategoria":"",
                "descricao":"",
                "valor":formataValor('0.00'),
                "parcela":'INDETERMINADO',
                "indeterminada":"NAO",
                "tipo":"APAGAR",
                "status":"",
                "datavencimento": new Date()
            };
            $scope.nova = false;
            $scope.categorias = [];
        }
        inciaScope();
    
        $scope.novaConta = function () {
            $scope.nova = true;
        }

        /* Monta lista de Parcelas pro Select */
        var montaParcelas = function () {
            $scope.parcelas = [];
            $scope.parcelas.push('INDETERMINADO');
            for (var x=1; x<=420; x++) {
                $scope.parcelas.push(x);
            }
        };
        montaParcelas();

        $scope.listarContasPorUsuario = function (page) {
            
            var metodo = (page === 'apagar') ? 'listarContasAPagarPorUsuario' : 'listarContasAReceberPorUsuario';

            var data = {
                "metodo":metodo,
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
        $scope.page = window.location.href.substring(window.location.href.lastIndexOf('/')+1);
        $scope.listarContasPorUsuario($scope.page);

        listarCategoriasDBLocal = function (tipo) {
            // listando localmente
            categoriaDAO.listarPorTipo(tipo.toUpperCase()).then(response => {
                if (response.success) {
                    $scope.categorias = response.data;
                    if ($scope.categorias.length > 0) {
                        $scope.conta.idcategoria = $scope.categorias[0].id;
                    }else{
                        // listarCategorias(tipo);
                    }
                }
            });
        };
        listarCategoriasDBLocal($scope.page);
        listarCategorias = function (page) {
            var tipo = (page === 'apagar') ? 'APAGAR' : 'ARECEBER';
            
            // listando localmente
            categoriaDAO.listarPorTipo(tipo).then(response => {
                    // if (response.success) {
                    //     $scope.categorias = response.data;
                    //     if ($scope.categorias.length > 0) {
                    //         $scope.conta.idcategoria = $scope.categorias[0].id;
                    //     }else{
                            var metodo = (page === 'apagar') ? 'listarCategoriaContasAPagar' : 'listarCategoriasContasAReceber';
                            var data = {
                                "metodo":metodo,
                                "class":"categoria"
                            };
                            genericAPI.generic(data)
                            .then(function successCallback(response) {
                                if( response.data.success === true ){
                                    $scope.categorias = response.data.data;
                                    $scope.conta.idcategoria = $scope.categorias[0].id;
                                }else{
                                    console.log( response.data.msg );
                                }
                            }, function errorCallback(response) {
                                //error
                            });	
                        // }
            //         }
                
            });
        }
        // listarCategorias($scope.page);

        $scope.editar = function (obj) {
            obj.datavencimento = moment(obj.datavencimento).format('DD/MM/YYYY');
            obj.parcela = parseInt(obj.parcela);
            $scope.conta = obj;
            $scope.novaConta();
        }
    
        $scope.salvar = function (obj) {
            
            obj.idusuario = $rootScope.usuario.idusuario;
            
            var metodo = "cadastrar";
            if(obj.id) metodo = "atualizar";
            
            // obj.datavencimento = obj.datavencimento.substr(6)+'-'+obj.datavencimento.substr(3,2)+'-'+obj.datavencimento.substr(0,2);
    
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