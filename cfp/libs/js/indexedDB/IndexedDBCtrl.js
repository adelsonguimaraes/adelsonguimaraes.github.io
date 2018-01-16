/*
    Controlador de conexão com Banco de dados IndexDB(Navegador)
*/

window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange

if (!window.indexedDB) {
    console.log("Your browser doesn't support a stable version of IndexedDB.");
}

let db;
let request;

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
    "start": function () {
        return new Promise (resolve => {
            // abre o banco
            request = indexedDB.open(indexedDBCtrl.name, indexedDBCtrl.version);
            
            // reset variáveis
            indexedDBCtrl.reset();

            request.onsuccess = function(event) {
                db = request.result;
                indexedDBCtrl.response.set(true, "Conexão com banco de dados "+ indexedDBCtrl.name + " iniciada!", "");
            };           
            
            request.onupgradeneeded = function(e) {
                
                db = request.result;
                for(var t in indexedDBCtrl.tables) {
                    var table = indexedDBCtrl.tables[t];
                    var store = db.createObjectStore(table.name, {keyPath: "id"});
                    for(var i in table.indexes){
                        var index = table.indexes[i];
                        store.createIndex(index.description, index.index, {unique: index.unique});
                    }
                }
            };
            resolve(indexedDBCtrl.response);
        });
    },
    "getObjectStore": function (table) {
        return db.transaction([table], "readwrite")
        .objectStore(table);
    },
    "add": function (table, data) {
        return new Promise (resolve => {
            // adicionando ao banco de dados
            var request = indexedDBCtrl.getObjectStore(table).add(data);
            
            indexedDBCtrl.reset();
    
            request.onsuccess = function(event) {
                // db = request.result;
                indexedDBCtrl.response.set(true, "Dados adicionados com sucesso!", data);
                resolve(indexedDBCtrl.response);
            }
        });
    },
    "getPorId": function (table, id) {
        return new Promise (resolve => {
            request = indexedDBCtrl.getObjectStore(table).get(+id);
        
            // reset variáveis
            indexedDBCtrl.reset();

            request.onsuccess = function(event) {
                indexedDBCtrl.selectedItem = request.result;
                resolve(indexedDBCtrl.selectedItem);
            };
        });
    },
    "getAll": function (table) {
        return new Promise (resolve => {
            request = indexedDBCtrl.getObjectStore(table).openCursor();
            request.onsuccess = (event) => {
                cursor = event.target.result;
                if (cursor) {
                    indexedDBCtrl.listItem.push(cursor.value);
                    cursor.continue();
                }else{
                    // no more results
                }
                resolve(indexedDBCtrl.listItem);
            };
        });
    },
    "update": function (table, data, metodo) {
        return new Promise (resolve => {
            indexedDBCtrl.getPorId(table, +data.id).then(selectItem => {   
                
                // reset variáveis
                indexedDBCtrl.reset();
                if ( indexedDBCtrl.selectedItem ) {
                    request = indexedDBCtrl.getObjectStore(table).put(data);
                    
                    request.onsuccess = function(event) {
                        request = indexedDBCtrl.getObjectStore(table).put(data);
                        indexedDBCtrl.response.set(true, 'Dados atualizados com sucesso!', data);
                        resolve(indexedDBCtrl.response);
                    };
                }else{
                    indexedDBCtrl.response.set(false, 'Este dado não foi encontrado!', data);
                    resolve(indexedDBCtrl.response);
                }
            });
        });
        
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
indexedDBCtrl.start(response => {/*staratando o DB*/});