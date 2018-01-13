/*
    Controlador de conexão com Banco de dados IndexDB(Navegador)
*/

window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange

if (!window.indexedDB) {
    console.log("Your browser doesn't support a stable version of IndexedDB.");
}

const indexedDBCtrl = {
    "name":"cfp", // nome do banco
    "version":1, // versão do banco
    "con":"", // conexao
    "db":"", // banco
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
        this.request = indexedDB.open(this.name, this.version);
        
        this.request.onerror = function(event) {
            console.log("error: ");
        };
         
        this.request.onsuccess = function(event) {
            this.db = this.request.result;
            console.log("success: "+ this.db);
        }
    },
    "createTable": function (table) {
        this.request.onupgradeneeded = function(e) {
            this.db = this.request.result;
            this.db.createObjectStore(table, {keyPath: "id"});
        };
    },
    "add": function (table, data) {
        
        var request = db.transaction([this.name], "readwrite")
        .objectStore(table)
        .add(data);
        
        request.onsuccess = function(event) {
            console.log("Dados adicionado com sucesso!");
        };
        
        request.onerror = function(event) {
            console.log("Não foi possível adicionar ao banco de dados! ");
        }
        
    },
    "update": function (table, data) {

    },
    "get": function (table, data) {

    },
    "delete": function (table, data) {

    }
};