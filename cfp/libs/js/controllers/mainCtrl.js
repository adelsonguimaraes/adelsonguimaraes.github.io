/*******************************************
		Controller Main
*******************************************/
var mainCtrl = function ($location, $rootScope, authenticationAPI, genericAPI) {

    var root = $rootScope;
    
    root.usuario = ""; //startando variavel global usuario

    // authenticationAPI.verificaSessao();
    authenticationAPI.sessionCtrl();

    $rootScope.syncDB = function () {
        
        // se off-line ou navegador sem suport a indexedDB
        if (!navigator.onLine || !indexedDBCtrl.support) return false;

        // só faz a sincronização para usuários logados
        if(!$rootScope.usuario) return false;

        // categoria
        function categoriaSync() {
            var dbNuvem = [];
            var dbLocal = [];
            var data = {
                "metodo":'listar',
                "class":"categoria"
            };
            genericAPI.generic(data)
            .then(function successCallback(response) {
                if( response.data.success === true ){
                    categoriaDAO.listarTodos().then(resp=>{
                        setTimeout(() => {
                            if (resp.success) {
                                dbNuvem = response.data.data;
                                dbLocal = resp.data;
                                
                                var f = []; // first
                                var s = []; // second
                                var d = ''; // destino (DbNuvem/DBLocal)

                                // ordena pelo tamanho banco quem será o primeiro e quem será o segundo array (First/Second)
                                (dbNuvem.length >= dbLocal.length) ? (f = dbNuvem, s = dbLocal, d = 'dbLocal') : (f = dbLocal, s = dbNuvem, d = 'dbNuvem');

                                // verifica se o DB Secundário(de menor tamanho) está vazio e se DB Primário é > 0 se sim, cadastra todos os dados do DB primário(de maior tamanho)
                                if (s.length === 0 && f.length > 0) {
                                    /*
                                        Function necessário para fazer uma nova requisição a promise somente
                                        quando ela estiver totalmente resolvida
                                    */ 
                                    percorreArray = function (array, length, pos) {
                                        if (pos < length) {
                                            // se o destino for o DBLocal, chamamos o metodo local
                                            if (d === 'dbLocal') {
                                                array[pos].sync = 'SIM'; // setamos sync como sim
                                                categoriaDAO.cadastrar(array[pos]).then(resp => {
                                                    if (resp.success){
                                                        // setamos na Nuvem que este dado se encontra em sincronia
                                                        var data = {
                                                            "metodo":'atualizar',
                                                            "class":"categoria",
                                                            "data":array[pos]
                                                        };
                                                        genericAPI.generic(data)
                                                        .then(function successCallback(response) {
                                                            if (response.data.success) {
                                                                percorreArray(array, array.length, pos+1);
                                                            }
                                                        });
                                                    }
                                                });
                                            // senao o destino será o dbnuvem
                                            }else{
                                                array[pos].sync = 'SIM'; // setamos sync como sim
                                                
                                                var data = {
                                                    "metodo":'cadastrar',
                                                    "class":"categoria",
                                                    "data":array[pos]
                                                };
                                                genericAPI.generic(data)
                                                .then(function successCallback(response) {
                                                    if (response.data.success) {
                                                        categoriaDAO.setIDNuvem(array[pos], response.data.data).then(response => {
                                                            if (response.success) {
                                                                percorreArray(array, array.length, pos+1);
                                                            }
                                                        });
                                                    }
                                                });
                                            }
                                        }
                                    };
                                    percorreArray(f, f.length, 0);
                                    return false;
                                
                                // se os dois bancos estiverem com dados entramos na sincronização 
                                }else if (dbNuvem.length > 0 && dbLocal.length > 0) {
                                    
                                        // laco de primário
                                        percorreArray = function (array, length, pos) {
                                            // se posição atigiu o limite ele para
                                            if (pos >= length) return false;
                                            
                                            // laco do secundário
                                            for (var x in dbLocal) {
                                                // se o primaário for encontrado no secundário
                                                if (+array[pos].id === +dbLocal[x].id) {
                                                    if (array[pos].sync === 'SIM' && dbLocal[x].sync === 'SIM') { // se o dado já for um dado atualizado
                                                        // se a data de edição local é maior que a data da nuvem atualiza os dados da nuvem
                                                        console.log(dbNuvem[x]);
                                                        if (moment(dbLocal[x].dataedicao).valueOf() > moment(array[pos].dataedicao).valueOf()) {
                                                            var data = {
                                                                "metodo":'atualizar',
                                                                "class":"categoria",
                                                                "data":dbLocal[x]
                                                            };
                                                            genericAPI.generic(data)
                                                            .then(function successCallback(response) {
                                                                if (response.data.success) {
                                                                    console.log('atualiza nuvem', dbLocal[x]);
                                                                    percorreArray(array, array.length, pos+1);
                                                                }
                                                            });    
                                                        // senao atualiza os dados locais
                                                        }else{
                                                            array[pos].sync = 'SIM'; // adiciona o sync
                                                            categoriaDAO.atualizar(array[pos]).then(response => {
                                                                if (response.success) {
                                                                    console.log('atualizado local', array[pos]);
                                                                    percorreArray(array, array.length, pos+1);
                                                                }
                                                            });
                                                        }
                                                    }else{ // cadastra na nuvem e sincroniza

                                                    }
                                                    
                                                }
                                            }
                                        }
                                        percorreArray(dbNuvem, dbNuvem.length, 0);
                                    }

                            
                            }
                        }, 100);
                    });
                }else{
                    console.log( response.data.msg );
                }
            });
        }
        categoriaSync();

    };
    $rootScope.syncDB();
}

angular.module( 'cfp' )
	.controller( 'mainCtrl', mainCtrl );