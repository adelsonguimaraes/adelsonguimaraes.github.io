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
    "tables":[
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
        // var request = indexedDB.open(this.name, this.version);
        var request = indexedDB.open(this.name, this.version);
        var tables = this.tables;
        
        request.onerror = function(event) {
            console.log("error: ");
        };
         
        request.onsuccess = function(event) {
            db = request.result;
            console.log("success: "+ db);
        }
        
        request.onupgradeneeded = function(e) {
            db = request.result;
            for(var t in tables) {
                var table = tables[t];
                var store = db.createObjectStore(table.name, {keyPath: "id"});
                for(var i in table.indexes){
                    var index = table.indexes[i];
                    store.createIndex(index.description, index.index, {unique: index.unique});
                }
            }
            
        };

    },
    "getObjectStore": function (table) {
        return db.transaction([table], "readwrite")
        .objectStore(table);
    },
    "add": function (table, data) {
        var request = getObjectStore(table)
        .add(data);
        
        request.onsuccess = function(event) {
            console.log("Dados adicionado com sucesso!");
        };
        
        request.onerror = function(event) {
            console.log("Não foi possível adicionar ao banco de dados! ");
        }
        
    },
    "update": function (table, data, metodo) {
        var request = getObjectStore(table)
        .add(data);
    },
    "get": function (table, data) {
        
    },
    "delete": function (table, data) {

    }
};