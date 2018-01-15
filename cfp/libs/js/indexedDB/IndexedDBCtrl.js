/*
    Controlador de conexão com Banco de dados IndexDB(Navegador)
*/

window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange

if (!window.indexedDB) {
    console.log("Your browser doesn't support a stable version of IndexedDB.");
}

var db;
var request;

const indexedDBCtrl = {
    "name":"cfp", // nome do banco
    "version":1, // versão do banco
    "con":"", // conexao
    "selectedItem":[],
    "listItem":"",
    "response":{
        "success":false,
        "msg":"",
        "data":"",
        "set": function (s, m, d) {
            this.success = s;
            this.msg = m;
            this.data = d;
        }
    },
    "reset": function () {
        // reset response
        this.response.set(false, "Ocorreu um erro!", "");
        // reset selectItem
        this.selectedItem = "";
        // reset listItem
        this.listItem =[];
    },
    "tables":[
        {
            'name':'categoria',
            'indexes':[
                {'description':'id', 'index':'id', 'unique':true},
                {'description':'descricao', 'index':'descricao', 'unique':false},
                {'description':'tipo', 'index':'tipo', 'unique':false},
                {'description':'datacadastro', 'index':'datacastro', 'unique':false},
                {'description':'dataedicao', 'index':'dataedicao', 'unique':false}
            ]
        },
        {
            'name':'usuario',
            'indexes':[
                {'description':'id', 'index':'id', 'unique':true},
                {'description':'nome', 'index':'nome', 'unique':false},
                {'description':'email', 'index':'email', 'unique':false},
                {'description':'senha', 'index':'senha', 'unique':false},
                {'description':'perfil', 'index':'perfil', 'unique':false},
                {'description':'datacadastro', 'index':'datacastro', 'unique':false},
                {'description':'dataedicao', 'index':'dataedicao', 'unique':false}
            ]
        },
        {
            'name':'conta',
            'indexes':[
                {'description':'id', 'index':'id','unique':true},
                {'description':'idusuario', 'index':'idusuario','unique':false},
                {'description':'idcategoria', 'index':'idcategoria','unique':false},
                {'description':'descricao', 'index':'descricao','unique':false},
                {'description':'valor', 'index':'valor','unique':false},
                {'description':'parcela', 'index':'parcela','unique':false},
                {'description':'tipo', 'index':'tipo','unique':false},
                {'description':'status', 'index':'status','unique':false},
                {'description':'datavencimento', 'index':'datavencimento','unique':false},
                {'description':'datacadastro', 'index':'datacastro', 'unique':false},
                {'description':'dataedicao', 'index':'dataedicao', 'unique':false}
            ]
        }
    ],
    "init": function () {
        
        // Handle the prefix of Chrome to IDBTransaction/IDBKeyRange.
        if ('webkitIndexedDB' in window) {
            window.IDBTransaction = window.webkitIDBTransaction;
            window.IDBKeyRange = window.webkitIDBKeyRange;
        }

        indexedDB.db = null;
        // Hook up the errors to the console so we could see it.
        // In the future, we need to push these messages to the user.
        indexedDB.onerror = function(e) {
            console.log('error', e);
        };
    },
    "start": function () {
        // abre o banco
        var ctrl = this;
        var request = indexedDB.open(ctrl.name, ctrl.version);
        
        // reset variáveis
        ctrl.reset();

        request.onerror = function(event) {
            ctrl.response.set(false, "Erro ao tentar conectar ao banco de dados "+ ctrl.name, "");
            // console.log("Erro ao tentar conectar com o banco de dados "+ ctrl.name);
        };
         
        request.onsuccess = function(event) {
            db = request.result;
            ctrl.response.set(true, "Conexão com banco de dados "+ ctrl.name + " iniciada!", "");
            // console.log("Conexão com banco de dados "+ ctrl.name +" iniciada!" );
        }
        
        request.onupgradeneeded = function(e) {
            
            db = request.result;
            for(var t in ctrl.tables) {
                var table = ctrl.tables[t];
                var store = db.createObjectStore(table.name, {keyPath: "id"});
                for(var i in table.indexes){
                    var index = table.indexes[i];
                    store.createIndex(index.description, index.index, {unique: index.unique});
                }
            }
            
        };


        return ctrl.response;
    },
    "getObjectStore": function (table) {
        return db.transaction([table], "readwrite")
        .objectStore(table);
    },
    "add": function (table, data) {
        var ctrl = this;
        
        var request = ctrl.getObjectStore(table)
        .add(data);
        
        // reset variáveis
        ctrl.reset();

        request.onsuccess = function(event) {
            db = request.result;
            ctrl.response.set(true, "Dados adicionados com sucesso!", data);
        }

        request.onerror = function(event) {
            ctrl.response.set(false, "Não foi possível adicionar ao banco de dados", "");
        };
        return ctrl.response;
    },
    "getPorId": function (table, id) {
        var ctrl = this;
        
        var request = ctrl.getObjectStore(table).get(+id);
        
        // reset variáveis
        ctrl.reset();

        request.onsuccess = function(event) {
            ctrl.selectedItem = request.result;
            ctrl.response.set(true, "Get realizado com sucesso!", ctrl.selectedItem);
        };
        
        request.onerror = function(event) {
            ctrl.response.set(false, "Não foi possível localizar o dado no banco de dados!", "");
        }
        return ctrl.response;
    },
    "getAll": function (table) {
        // var ctrl = this;
        return new Promise (function (resolve, reject) {

            var request = indexedDBCtrl.getObjectStore(table).openCursor();
            // reset variáveis
            indexedDBCtrl.reset();

            request.onsuccess = function(event) {
                var cursor = event.target.result;
                if(cursor) {
                    indexedDBCtrl.listItem.push(cursor.value);
                    cursor.continue();
                } else {
                    // no more results
                }
                indexedDBCtrl.response.set(true, "Listagem realizada com sucesso!", indexedDBCtrl.listItem);
                resolve(indexedDBCtrl.response);
            }
            request.onerror = function(event) {
                indexedDBCtrl.response.set(false, "Erro ao tentar listar!", '');
                // console.log("Não foi possível localizar o dado no banco de dados! ");
            };
        });
        // return ctrl.response;
    },
    "update": function (table, data, metodo) {
        var ctrl = this;
        
        ctrl.getPorId(table, +data.id);
        
        // reset variáveis
        ctrl.reset();
        
        if ( ctrl.selectedItem ) {
            var request = ctrl.getObjectStore(table).put(data);
            
            request.onsuccess = function(event) {
                var request = ctrl.getObjectStore(table).put(data);
                ctrl.response.set(true, 'Dados atualizados com sucesso!', data);
            };
            
            request.onerror = function(event) {
                ctrl.response.set(false, 'Não foi possível atualizar no banco de dados!', '');
            }
        };
        return ctrl.response;
        
    },
    "delete": function (table, data) {
        var ctrl = this;
        
        // reset variáveis
        ctrl.reset();
        
        // if ( ctrl.selectedItem ) {
            var request = this.getObjectStore(table).delete(+data.id);
            
            request.onsuccess = function(event) {
                ctrl.response.set(true, 'Dados deletados com sucesso!', data);
                success(ctrl.response);
            };
            
            request.onerror = function(event) {
                ctrl.response.set(false, 'Não foi possível deletar no banco de dados!', data);
                error(ctrl.response);
            }
        // }
        return ctrl.response;
    }
};

// starta conexão
indexedDBCtrl.start();