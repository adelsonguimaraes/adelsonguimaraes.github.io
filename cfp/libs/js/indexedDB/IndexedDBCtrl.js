/*
    Controlador de conexão com Banco de dados IndexDB(Navegador)
*/

window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange

if (!window.indexedDB) {
    console.log("Your browser doesn't support a stable version of IndexedDB.");
    indexedDBCtrl.support = false;
}

let request, db;

const indexedDBCtrl = {
    "support": true,
    "dbName": 'cfp',
    "dbVersion": 1,
    "tables":[
        {
            'name':'categoria',
            'indexes':[
                {'description':'id', 'index':'id', 'unique':false},
                {'description':'descricao', 'index':'descricao', 'unique':false},
                {'description':'tipo', 'index':'tipo', 'unique':false},
                {'description':'sync', 'index':'sync', 'unique':false},
                {'description':'ativo', 'index':'ativo', 'unique':false},
                {'description':'datacadastro', 'index':'datacastro', 'unique':false},
                {'description':'dataedicao', 'index':'dataedicao', 'unique':false}
            ]
        },
        {
            'name':'usuario',
            'indexes':[
                {'description':'id', 'index':'id', 'unique':false},
                {'description':'nome', 'index':'nome', 'unique':false},
                {'description':'email', 'index':'email', 'unique':false},
                {'description':'senha', 'index':'senha', 'unique':false},
                {'description':'perfil', 'index':'perfil', 'unique':false},
                {'description':'sync', 'index':'sync', 'unique':false},
                {'description':'ativo', 'index':'ativo', 'unique':false},
                {'description':'datacadastro', 'index':'datacastro', 'unique':false},
                {'description':'dataedicao', 'index':'dataedicao', 'unique':false}
            ]
        },
        {
            'name':'conta',
            'indexes':[
                {'description':'id', 'index':'id','unique':false},
                {'description':'idusuario', 'index':'idusuario','unique':false},
                {'description':'idcategoria', 'index':'idcategoria','unique':false},
                {'description':'descricao', 'index':'descricao','unique':false},
                {'description':'valor', 'index':'valor','unique':false},
                {'description':'parcela', 'index':'parcela','unique':false},
                {'description':'tipo', 'index':'tipo','unique':false},
                {'description':'status', 'index':'status','unique':false},
                {'description':'datavencimento', 'index':'datavencimento','unique':false},
                {'description':'sync', 'index':'sync', 'unique':false},
                {'description':'datacadastro', 'index':'datacastro', 'unique':false},
                {'description':'dataedicao', 'index':'dataedicao', 'unique':false}
            ]
        },
        {
            'name':'contamovimentacao',
            'indexes':[
                {'description':'id', 'index':'id','unique':false},
                {'description':'idconta', 'index':'idconta','unique':false},
                {'description':'valor', 'index':'valor','unique':false},
                {'description':'datareferencia', 'index':'datareferencia','unique':false},
                {'description':'sync', 'index':'sync', 'unique':false},
                {'description':'datacadastro', 'index':'datacastro', 'unique':false},
                {'description':'dataedicao', 'index':'dataedicao', 'unique':false}
            ]
        }
    ],
    start() {
        return new Promise (resolve => { 
            setTimeout(() => {
                if (!this.support) return false;

                request = indexedDB.open(this.dbName, this.dbVersion);
                request.onsuccess = (event) => {
                    // db = (db) ? db : request.result;
                    db = (db) ? db : event.target.result;
                    resolve(this);
                };
                request.onupgradeneeded = (event) => {
                    db = (db) ? db : event.target.result;
                    for(var t in this.tables) {
                        var table = this.tables[t];
                        var store = db.createObjectStore(table.name, {keyPath: "id"});
                        for(var i in table.indexes){
                            var index = table.indexes[i];
                            store.createIndex(index.description, index.index, {unique: index.unique});
                        }
                    }
                };
                request.onerror = (event) => {
                    console.error('[IndexedDBCtrl]:[ERROR]:', event);
                }
            }, 100);
        });
    },
    getObjectStore(table) {
        return db.transaction([table], "readwrite").objectStore(table);
    },
    add(table, data) {
        return new Promise (resolve => {
            request = this.getObjectStore(table).add(data);
            request.onsuccess = (event) => {
                resolve(data);
            };
            request.onerror = (event) => {
                console.log(data);
                console.log(event);
            }
        });
    },
    update(table, data) {
        return new Promise (resolve => {
            setTimeout(() => {
                request = this.getObjectStore(table).put(data);
                request.onsuccess = (event) => {
                    resolve(data);
                };
            }, 100)
        });
    },
    get(table, id) {
        return new Promise (resolve => {
            setTimeout(() => {
                request = this.getObjectStore(table).get(id);
                request.onsuccess = (event) => {
                    // console.log(request.result);
                    // resolve(request.result);
                    resolve(event.target.result)
                }
            }, 100);
        });
    },
    getAll(table) {
        return new Promise (resolve => {
            var list = [];
            // request = this.getObjectStore(table).openCursor();
            request = this.getObjectStore(table).getAll();
            resolve(request);
        });
    },
    remove(table, id) {
        return new Promise (resolve => {
            request = this.getObjectStore(table).delete(id);
            request.onsuccess = (event) => {
                resolve(this.getAll(table));
            }
        });
    }
}

indexedDBCtrl.start().then(db => {
    console.warn('Conexão com IndexedDB estabelecida!');
});