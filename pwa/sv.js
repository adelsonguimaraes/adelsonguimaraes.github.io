import { DB } from './js/toDoDB';

DB.start();

const CACHE_NAME = 'v1.0.0';
const FILES = [
    './',
    './index.html',
    './css/styles.css',
    './app.bundle.js'
]




self.addEventListener('install', function(event){
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache){
            return cache.addAll(FILES);
        })
    )
})

self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then(function (keys) {
            return Promise.all(keys
                .filter(function (key) {
                    return key.indexOf(CACHE_NAME) !== 0;
                })
                .map(function (key) {
                    return caches.delete(key);
                })
            );
        })
    );
});

self.addEventListener('fetch', function(event){
    event.respondWith(
        caches.match(event.request).then(function(response){
            return response || fetch(event.request);
        })
    )
})


function sendItems(){
    return DB.findAll('local')
        .then(items => DB.postAll(items));
}

function updateScreens(){
    self.clients.matchAll().then(function(clients){
        clients.forEach(function(client){
            client.postMessage('updateScreens');
        })
    })
}

self.addEventListener('sync', function(event){
    if(event.tag === 'newItem' || event.tag === 'test-tag-from-devtools' ){
        event.waitUntil(sendItems())
    }
})


self.addEventListener('message', function(event){
    if(event.data === 'updateScreens'){
        updateScreens();
    }
})


self.addEventListener('push', function(event){
    var message = event.data.text();
    self.registration.showNotification('Push message received', {
        body: message,
        icon: './images/tw_icon.png',
        actions: [
            {action: 'confirm1', title: 'Abrir PWA'},
            {action: 'confirm2', title: 'Abrir TreinaWeb'}
        ]
    })
})

self.addEventListener('notificationclick', function(event){
    event.notification.close();
    var url = event.action === 'confirm1' ? 'http://localhost:3000' : 'https://treinaweb.com.br';

    event.waitUntil(
        self.clients.matchAll().then(function(activeClients){
            if(activeClients.length > 0){
                activeClients[0].navigate(url);
            }else{
                self.clients.openWindow(url);
            }
        })
    )
})