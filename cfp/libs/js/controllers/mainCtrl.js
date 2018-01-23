/*******************************************
		Controller Main
*******************************************/
var mainCtrl = function ($location, $rootScope, $scope, authenticationAPI, genericAPI, $timeout) {

    var root = $rootScope;
    
    root.usuario = ""; //startando variavel global usuario
    root.onLine = navigator.onLine;

    // authenticationAPI.verificaSessao();
    authenticationAPI.sessionCtrl();

    $rootScope.syncDB = function (classe, metodolistar) {
        
        return new Promise (resolve => {
            // só faz a sincronização para usuários logados
            if(!$rootScope.usuario) return false;

            if (!root.onLine || !indexedDBCtrl.support) {
                resolve();
                return false;
            }

            // configuracao
            var dbNuvem = [];
            var dbLocal = [];
            var data = {
                "metodo":metodolistar,
                "class":classe
            };
            var DAOJS = eval(classe+'DAO');

            genericAPI.generic(data)
            .then(function successCallback(response) {
                if( response.data.success === true ){


                    
                    DAOJS.listarTodos().then(resp=>{
                        $timeout(() => {
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
                                    percorreArrayFirstSecond = function (array, length, pos) {
                                        if (pos < length) {
                                            // se o destino for o DBLocal, chamamos o metodo local
                                            if (d === 'dbLocal') {
                                                array[pos].sync = 'SIM'; // setamos sync como sim
                                                console.log(array[pos]);
                                                DAOJS.cadastrar(array[pos]).then(resp => {
                                                    if (resp.success){
                                                        // setamos na Nuvem que este dado se encontra em sincronia
                                                        var data = {
                                                            "metodo":'atualizar',
                                                            "class":classe,
                                                            "data":array[pos]
                                                        };
                                                        genericAPI.generic(data)
                                                        .then(function successCallback(response) {
                                                            if (response.data.success) {
                                                                percorreArrayFirstSecond(array, array.length, pos+1);
                                                            }
                                                        });
                                                    }
                                                });
                                            // senao o destino será o dbnuvem
                                            }else{
                                                array[pos].sync = 'SIM'; // setamos sync como sim
                                                array[pos].dataedicao = moment().format('YYYY-MM-DD hh:mm:ss');
                                                var data = {
                                                    "metodo":'cadastrar',
                                                    "class":classe,
                                                    "data":array[pos]
                                                };
                                                genericAPI.generic(data)
                                                .then(function successCallback(response) {
                                                    if (response.data.success) {
                                                        DAOJS.setIDNuvem(array[pos], response.data.data).then(response => {
                                                            if (response.success) {
                                                                percorreArrayFirstSecond(array, array.length, pos+1);
                                                            }
                                                        });
                                                    }
                                                });
                                            }
                                        }else{
                                            resolve();
                                        }
                                    };
                                    percorreArrayFirstSecond(f, f.length, 0);
                                    return false;
                                
                                // se os dois bancos estiverem com dados entramos na sincronização 
                                }else if (dbNuvem.length > 0 && dbLocal.length > 0) {
                                    /*
                                        Cadastra todos os dados Nuvem sem sincronização no Local
                                    */
                                    SyncNuvemToLocal2 = function () {
                                        percorreArray = function (array, length, pos) {
                                            
                                            // se posição atigiu o limite ele para
                                            if (pos >= length) return false;
                                            
                                            if (array[pos].sync === 'NAO') {

                                                array[pos].sync = 'SIM'; // setamos sync como sim
                                                console.log(array[pos]);
                                                DAOJS.cadastrar(array[pos]).then(resp => {
                                                    if (resp.success){
                                                        // setamos na Nuvem que este dado se encontra em sincronia
                                                        var data = {
                                                            "metodo":'atualizar',
                                                            "class":classe,
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
                                            }else{
                                                percorreArray(array, array.length, pos+1);
                                            }
                                        };
                                        percorreArray(dbNuvem, dbNuvem.length, 0);
                                    };
                                    // SyncNuvemToLocal();

                                    SyncNuvemToLocal = function () {
                                        // percorreArray = function (array, length, pos) {
                                            
                                            /*
                                                Listando todos as contas que já estão sincronizadas localmente
                                            */
                                            DAOJS.listarSync($rootScope.usuario.idusuario)
                                            .then(response =>{
                                                setTimeout(() => {
                                                    if (response.success) {
                                                        /*
                                                            Listamos no DBNuvel todas as contas do usuário
                                                            que tem ID diferente dos ids sincronizados local
                                                        */
                                                        var data = {
                                                            "metodo":'listarNotIn',
                                                            "class":classe,
                                                            "data":response.data
                                                        };
                                                        // console.log(data);
                                                        genericAPI.generic(data)
                                                        .then(function successCallback(response) {
                                                            if (response.data.success) {
                                                                var lista = response.data.data;
                                                                for (var i in lista) {
                                                                    /*
                                                                        Cadastramos cada um dos novos IDs local
                                                                    */
                                                                    DAOJS.cadastrar(lista[i]).then(resp => {
                                                                        if (resp.success){
                                                                            console.log('[info]: Item adicionado DBLoca', lista[i]);
                                                                        }
                                                                    });
                                                                }
                                                                // percorreArray(array, array.length, pos+1);
                                                            }
                                                        });
                                                    }
                                                }, 100);
                                            });
                                        // };
                                        // percorreArray(dbNuvem, dbNuvem.length, 0);
                                    };
                                    SyncNuvemToLocal();

                                    /*
                                        Cadastra todos os dados locais sem sincronização na Nuvem
                                    */
                                    SyncLocalToNuvem = function () {
                                        percorreArray = function (array, length, pos) {
                                            
                                            // se posição atigiu o limite ele para
                                            if (pos >= length) return false;
                                            
                                            if (array[pos].sync === 'NAO') {
                                                array[pos].sync = 'SIM'; // setamos sync como sim
                                                var data = {
                                                    "metodo":'cadastrar',
                                                    "class":classe,
                                                    "data":array[pos]
                                                };
                                                genericAPI.generic(data)
                                                .then(function successCallback(response) {
                                                    if (response.data.success) {
                                                        eval(classe+'DAO').setIDNuvem(array[pos], response.data.data).then(response => {
                                                            if (response.success) {
                                                                percorreArray(array, array.length, pos+1);
                                                            }
                                                        });
                                                    }
                                                });
                                            }else{
                                                percorreArray(array, array.length, pos+1);
                                            }
                                        };
                                        percorreArray(dbLocal, dbLocal.length, 0);
                                    };
                                    SyncLocalToNuvem();

                                    SyncFinal = function () {
                                        // laco de primário
                                        percorreArray = function (array, length, pos) {
                                            // se posição atigiu o limite ele para
                                            if (pos < length) {
                                                
                                                // laco do secundário
                                                for (var x in dbLocal) {
                                                    // se o primaário for encontrado no secundário
                                                    if (+array[pos].id === +dbLocal[x].id) {
                                                        if (array[pos].sync === 'SIM' && dbLocal[x].sync === 'SIM') { // se o dado já for um dado atualizado
                                                            // se a data de edição local é maior que a data da nuvem atualiza os dados da nuvem
                                                            var deNuvem = (array[pos].dataedicao !== null) ? array[pos].dataedicao : '0000-00-00 00:00:00';
                                                            var deLocal = (dbLocal[x].dataedicao !== null) ? dbLocal[x].dataedicao : '0000-00-00 00:00:00';

                                                            if (moment(deLocal).valueOf() > moment(deNuvem).valueOf()) {
                                                                var data = {
                                                                    "metodo":'atualizar',
                                                                    "class":classe,
                                                                    "data":dbLocal[x]
                                                                };
                                                                genericAPI.generic(data)
                                                                .then(function successCallback(response) {
                                                                    if (response.data.success) {
                                                                        // console.log('atualiza nuvem', dbLocal[x]);
                                                                        percorreArray(array, array.length, pos+1);
                                                                    }
                                                                });    
                                                            // senao atualiza os dados locais
                                                            }else{
                                                                array[pos].sync = 'SIM'; // adiciona o sync
                                                                eval(classe+'DAO').atualizar(array[pos]).then(response => {
                                                                    if (response.success) {
                                                                        // console.log('atualizado local', array[pos]);
                                                                        percorreArray(array, array.length, pos+1);
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    }else{
                                                        // caso não haja dados iguais para sync, seguimos o array
                                                        if (parseInt(x) === parseInt(dbLocal.length-1) ) {
                                                            percorreArray(array, array.length, pos+1);
                                                        }
                                                    }
                                                }
                                            }else{
                                                resolve();
                                            }
                                        }
                                        percorreArray(dbNuvem, dbNuvem.length, 0);
                                    };
                                    SyncFinal();
                                }else{
                                    resolve();
                                }
                            }
                        }, 500);
                    });
                }else{
                    console.error('[ERRO]:', response.data );
                    resolve();
                }
            },function errorCallback (response) {
                console.error('Erro:', response);
                resolve();
            });
        });
    };
    // $rootScope.syncDB('categoria');

    $rootScope.syncAllDB = function () {
        // $scope.syncStatus = true;
        document.getElementById('splash').style.display = 'inline-block';
        console.log('[Splash]: Start!');
        var classes = [
            {classe:'conta', metodolistar:'listarContasPorUsuario'},
            {classe:'categoria', metodolistar:'listar'}
        ];
        percorreArrayClasse = function (array, length, pos) {
            if (pos < length) {
                $rootScope.syncDB(array[pos].classe, array[pos].metodolistar).then(()=>{
                    percorreArrayClasse(array, length, pos+1);
                });
            }else{
                // $rootScope.syncStatus = false;
                document.getElementById('splash').style.display = 'none';
                console.log('[Splash]: Finish!');
            }
        };
        percorreArrayClasse(classes, classes.length, 0);
    };

    if ( root.usuario ) {
        // se off-line ou navegador sem suport a indexedDB
        alert(navigator.onLine);
        console.log('Status de Internet navigator.onLine', root.onLine);
        if (!root.onLine || !indexedDBCtrl.support) return false;
        $rootScope.syncAllDB();
    }

    $scope.loader = 'libs/img/ajax_loader_blue.gif';

    root.startLoad = function () {
        document.getElementById('load').style.display = 'inline-block';
    };
    root.stopLoad = function () {
        document.getElementById('load').style.display = 'none';
    }
}

angular.module( 'cfp' )
	.controller( 'mainCtrl', mainCtrl );