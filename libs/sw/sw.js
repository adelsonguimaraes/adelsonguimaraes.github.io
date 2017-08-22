/*
    Variável de conmfiguração
*/
var cacheName = 'sw-v1';
// var host = 'http://127.0.0.1/adelsonguimaraes.github.io/';
var host = 'https://adelsonguimaraes.github.io/';

var filesToCache = [
    host + 'index.html',
    host + 'libs/css/bootstrap/bootstrap.min.css',
    host + 'libs/js/jquery/jquery.min.js',
    host + 'libs/js/bootstrap/bootstrap.min.js',
    host + 'libs/js/angular/angular.min.js',
    host + 'libs/js/app.js',
    host + 'libs/js/controllers/mainCtrl.js'
];

self.addEventListener('install', function (e) {
    e.waitUntil(
        caches
            .open(cacheName)
            .then(function (cache) {
                return cache.addAll(filesToCache)
            })
            .then(function () {
                return self.skipWaiting()
            })
    );
}),

self.addEventListener('activate', function (e) {
    e.waitUntil(
        caches.keys().then(function (keyList) {
            return Promise.all(keyList.map(function(key){
                if ( key !== cacheName ) return caches.delete(key)
            }))
        })
    )
    // forçar escuta de eventos de fetch
    // assim que a service worker foi instalada
    return self.clients.claim()
}),

self.addEventListener('fetch', function (e) {
    e.respondWith(
        caches.match(e.request)
            .then(function(response) {
                return response || fetch(e.request)
            }
        )
    );
})