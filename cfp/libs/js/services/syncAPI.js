// service
(function () {
    
        "use strict"
    
        angular.module('cfp').service("syncAPI", function ( $http, $rootScope, genericAPI ) {

            function _syncAllDB () {
                // $scope.syncStatus = true;
                document.getElementById('splash').style.display = 'inline-block';
                console.log('[Splash]: Start!');
                var classes = [
                    {class:'conta', metodo:'listarContasPorUsuario', 'localToNuvem': true},
                    {class:'categoria', metodo:'listar', 'localToNuvem': false}
                ];
                var me = this;
                var percorreArrayClasse = function (i) {
                    me.generic(classes[i]).then(result =>{
                        console.log(result);
                        i++;
                        // se posição do array for indefinido para se não segue
                        if ( classes[i] !== undefined ) {
                            return percorreArrayClasse(i);
                        }else{
                            document.getElementById('splash').style.display = 'none';
                            console.log('[Splash]: Finish!');
                            return false;
                        }
                    });
                };
                percorreArrayClasse(0);
            };

            function _generic (data, scope) {

                /*
                    data :
                    1. class - A classe a ser sincronizada
                    2. data - Objeto com informações a serem inseridas no banco
                    3. metodo - Metodo de Listagem da class
                */
                return new Promise (resolve => {
                    
                    // configuracao
                    var dbNuvem = [];
                    var dbLocal = [];
                    var DAOJS = eval(data.class+'DAO');

                    // uma listagem da classe no DBNuvem
                    genericAPI.generic(data)
                    .then(function successCallback(response) {
                        if( response.data.success === true ){
                            // listagem DBLocal
                            DAOJS[data.metodo]($rootScope.usuario.idusuario).then(resp=>{
                                dbNuvem = response.data.data; // recebendo db nuvem
                                dbLocal = resp.data; // recebendo db local

                                // array com todos os dados para atualização e cadastro
                                let setInNuvem = [],
                                setInLocal = [];

                                // separando dados sincronizados e não sincronizados dbLocal
                                let dbLocalSync = []; // sincronizado
                                for (var i in dbLocal) {
                                    if (dbLocal[i].sync === 'SIM') {
                                        dbLocalSync.push(dbLocal[i]);
                                    }else{
                                        // array cadastrar
                                        dbLocal[i].sync = 'SIM'; // mudamos o status para sincronizado
                                        setInNuvem.push({data:dbLocal[i], 'metodo':'cadastrar'});
                                    }
                                };

                                // OBS: dados não sincronizados devem ser cadastrados no DBNuvem imediatamente
                                // OBS: dados Nuvem sempre estão Sync

                                // comparando os dados sync Nuvem com local
                                for(var i in dbNuvem) { // laco dbNuvem
                                    let count = 0;
                                    for (var l in dbLocalSync) { // laco dbLocal
                                        if (dbNuvem[i].sync === 'SIM' && dbLocalSync[l].sync === 'SIM') { // verifica se os dois dados são sync
                                            if (+dbNuvem[i].id === +dbLocalSync[l].id) { // verifica se os dados são iguas
                                                // testa qual dado está mais atualizado
                                                if (moment(dbNuvem[i].dataedicao).valueOf() > moment(dbLocalSync[l].dataedicao).valueOf()) {
                                                    // precisamos atualizar localmente
                                                    setInLocal.push({data:dbNuvem[i], metodo:'atualizar'});
                                                }else if (moment(dbNuvem[i].dataedicao).valueOf() < moment(dbLocalSync[l].dataedicao).valueOf()){
                                                    //precisamos atualizar na nuvem
                                                    setInNuvem.push({data:dbLocalSync[l], 'metodo':'atualizar'});
                                                }else{
                                                    // se os dados estiverem atualizados igualmente, não sincroniza
                                                    // pra quer gastar 3G né? =]
                                                }
                                                count++;
                                            }
                                        }
                                    }
                                    if (+count === 0 ) setInLocal.push({data:dbNuvem[i], 'metodo':'cadastrar'});
                                }

                                // comparando os dados sync Local com Nuvel
                                for(var l in dbLocalSync) { // laco dbLocal
                                    let count = 0;
                                    for (var i in dbNuvem) { // laco dbNuvem
                                        if (dbNuvem[i].sync === 'SIM' && dbLocalSync[l].sync === 'SIM') { // verifica se os dois dados são sync
                                            if (+dbNuvem[i].id === +dbLocalSync[l].id) { // verifica se os dados são iguas
                                                count++;
                                            }
                                        }
                                    }
                                    // verifica se a classe cadastra do local para a nuvem
                                    // se não deleta os dados locais (dados possivelmente de erro de sincronia)
                                    if (data.localToNuvem) {
                                        // se sim cadastrar em nuvem
                                        if (count === 0 ) setInNuvem.push({data:dbLocalSync[l], 'metodo':'cadastrar'});
                                    }else{
                                        // se não deltar em local
                                        if (count === 0 ) setInLocal.push({data:dbLocalSync[l], 'metodo':'deletar'});
                                    }
                                }
                                
                                // conf da syn db nuvem
                                let config = {
                                    'metodo':'sync',
                                    'data':setInNuvem,
                                    'class':data.class
                                };

                                // sincronização nuvem
                                genericAPI.generic(config)
                                .then(function successCallback(response) {
                                    if( response.data.success === true ){
                                        // o metodo retorna apenas dados cadastrados na nuvem
                                        // adicionamos ao array setInLocal como dados para atualizar
                                        // pois agora precisamos readicionar esses dados com os 
                                        // ids reais da nuvem
                                        if (response.data.data.length > 0) {
                                            for (var i in response.data.data) {
                                                setInLocal.push({data:response.data.data[i], 'metodo':'atualizar'});
                                            }
                                        }
                                        // agora fazemos a sincronização local
                                        DAOJS.sync(setInLocal);
                                        resolve([setInNuvem, setInLocal]);
                                    }
                                });
                            });
                        }
                    });
                });
            };
    
            return {
                syncAllDB: _syncAllDB,
                generic: _generic
            };
        });
    
    })();
    