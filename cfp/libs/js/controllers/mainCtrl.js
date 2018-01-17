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

        // categoria
        function categoria() {
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
                        if (resp.success) {
                            dbNuvem = response.data.data;
                            dbLocal = resp.data;
                            
                            var f = []; // first
                            var s = []; // second

                            (dbNuvem.length > dbLocal.length) ? (f = dbNuvem, s = dbLocal) : (f = dbLocal, s = dbNuvem);

                            if (dbNuvem.length === 0) {
                                
                                return false;
                            }
                            if (dbLocal.length === 0) {
                                percorreArray = function (array, length, pos) {
                                    if (pos < length) {
                                        categoriaDAO.cadastrar(array[pos]).then(resp => {
                                            if (resp.success){
                                                percorreArray(dbNuvem, dbNuvem.length, pos+1);
                                            }
                                        });
                                    }
                                };
                                percorreArray(dbNuvem, dbNuvem.length, 0);
                                return false;
                            }
                            // for (var i in f) {
                            //     for (var x in s) {
                            //         if (f[i].descricao === s[x].descricao) {

                            //         }
                            //     }
                            // }

                        
                        }
                    });
                }else{
                    console.log( response.data.msg );
                }
            });
        }
        categoria();

    };
    $rootScope.syncDB();
}

angular.module( 'cfp' )
	.controller( 'mainCtrl', mainCtrl );