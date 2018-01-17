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
    start() {
        return new Promise (resolve => { 
            
            if (!this.support) return false;

            request = indexedDB.open(this.dbName, this.dbVersion);
            request.onsuccess = (event) => {
                db = request.result;
                resolve(this);
            };
            request.onupgradeneeded = (event) => {
                for(var t in this.tables) {
                    var table = this.tables[t];
                    var store = db.createObjectStore(table.name, {keyPath: "id"});
                    for(var i in table.indexes){
                        var index = table.indexes[i];
                        store.createIndex(index.description, index.index, {unique: index.unique});
                    }
                }
            };
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
                console.log(event);
            }
        });
    },
    update(table, data) {
        return new Promise (resolve => {
            request = this.getObjectStore(table).put(data);
            request.onsuccess = (event) => {
                resolve(data);
            }
        });
    },
    get(table, id) {
        return new Promise (resolve => {
            request = this.getObjectStore(table).get(id);
            request.onsuccess = (event) => {
                resolve(request.result);
            }
        });
    },
    getAll(table) {
        return new Promise (resolve => {
            var list = [];
            request = this.getObjectStore(table).openCursor();
            request.onsuccess = (event) => {
                cursor = event.target.result;
                if (cursor) {
                    list.push(cursor.value);
                    cursor.continue();
                }
                resolve(list);
            }
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