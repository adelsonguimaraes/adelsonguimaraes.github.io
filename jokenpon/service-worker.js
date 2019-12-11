importScripts('./libs/js/sw-cache-polyfill.js');

let cacheName = 'dsp-v.1.0.0';
let filesToCache = [
    // './',
    'index.html',
    'app.js?',
    'config.js',
    // css
    'app/css/cadvisitante.css',
    'app/css/login.css',
    //css plugin
    'libs/css/bootstrap/bootstrap.min.css',
    'libs/css/animate/animate.css',
    'libs/css/font-awesome/fonts/fontawesome-webfont.woff2',
    'libs/css/font-awesome/css/font-awesome.css',
    'libs/js/jquery/jquery-2.1.1.min.js',
    'libs/js/angular/angular.min.js',
    'libs/js/angular/angular-sanitize.js',
    'libs/js/plugins/oclazyload/dist/ocLazyLoad.min.js',
    'libs/js/ui-router/angular-ui-router.min.js',
    'libs/js/plugins/angular-idle/angular-idle.js',
    // 'libs/js/plugins/number-picker/angular-number-picker.min.js',
    'libs/js/bootstrap/bootstrap.min.js',
    'libs/js/MD5.js',
    'libs/js/plugins/moment/moment.min.js',
    'libs/js/plugins/moment/moment-timezone.js',
    // directives
    // 'libs/js/directives/directives.js',
    // services
    'app/services/authenticationAPIService.js',
    'app/services/genericAPIService.js',
    // filters
    'app/filters/filters.js',
    // images
    'libs/img/ajax_loader_blue.gif',
    'libs/img/enterprise.png',
    'libs/img/icons/icon-128x128.png',
    'libs/img/icons/icon-144x144.png',
    'libs/img/icons/icon-152x152.png',
    'libs/img/icons/icon-192x192.png',
    'libs/img/icons/icon-256x256.png',
    'libs/img/icons/icon-512x512.png',
    // views
    'app/views/login.html',
    'app/views/cadvisitante.html',
    // commons
    'app/views/common/header.html',
    // // // controllers
    'app/controllers/mainCtrl.js',
    'app/controllers/loginCtrl.js',
    'app/controllers/cadvisitanteCtrl.js'
];

self.addEventListener('install', (e) => {
    console.log( '[ServiceWorker] Installer' );
    // forçando service atualizar
    self.skipWaiting();
    e.waitUntil(
        caches.open(cacheName).then((cache) =>{
            // console.log( '[ServiceWorker] Caching app shell' );
            return cache.addAll(filesToCache);
        })
    );
});

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