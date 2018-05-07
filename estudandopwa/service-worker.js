importScripts('./libs/js/sw-cache-polyfill.js');

let cacheName = 'estudandopwa-v.1.0.0';
let filesToCache = [
    './',
    'index.html',
    'libs/css/style.css',
    'libs/js/util/notification.js',
    'libs/img/off-line.jpg'
];
// verificando se ainda há espaço para armazenamento em cache
if ('storage' in navigator && 'estimate' in navigator.storage) {
    navigator.storage.estimate().then(({ usage, quota }) => {
    self.addEventListener('install', (e) => {
        console.log( '[ServiceWorker] Installer' );
        // forçando service atualizar
        self.skipWaiting();
                if ( usage < quota ) {
                    e.waitUntil(
                        caches.open(cacheName).then((cache) => {
                            // console.log( '[ServiceWorker] Caching app shell' );
                            return cache.addAll(filesToCache);
                        })
                    );
                }else{
                    // console.log(`Using ${usage} out of ${quota} bytes.`);
                    console.warn(`O Limite de Quota foi atingido e não pode-se mais salvar em Cache! Quota: ${usage} utilizado de ${quota}`);
                }
        });

    });
}

self.addEventListener('activate', (e) => {
    console.log( '[ServiceWorker] Activate' );
    e.waitUntil(
        caches.keys().then((keyList) =>{  
            return Promise.all(keyList.map((key) => {
                console.log( '[ServiceWorker] Old cache', key );
                console.log( '[ServiceWorker] New cache', cacheName );
                if (key !== cacheName) {
                    console.log( '[ServiceWorker] Removing old cache', key );
                    return caches.delete(key);
                }
            }));
        })
    );
});


self.addEventListener('fetch', (e) => {
    // console.log( '[ServiceWorker] Fetch', e.request.url);
    e.respondWith(
        caches.match(e.request).then((response) =>{
            return response || fetch(e.request);
        })
    );
});