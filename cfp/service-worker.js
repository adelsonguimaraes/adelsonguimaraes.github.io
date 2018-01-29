let cacheName = 'cfp-v.1.2.1';
let filesToCache = [
    './',
    'index.html',
    'libs/css/bootstrap.min.css',
    'libs/css/animate.css',
    'libs/font-awesome/fonts/fontawesome-webfont.woff2',
    'libs/font-awesome/css/font-awesome.css',
    'libs/css/style.css',
    'libs/css/style-cfp.css',
    'libs/js/style-cfp.js',
    'libs/js/jquery-2.2.4.min.js',
    'libs/js/angular.min.js',
    'libs/js/angular/angular-sanitize.js',
    'libs/js/plugins/oclazyload/dist/ocLazyLoad.min.js',
    'libs/js/ui-router/angular-ui-router.min.js',
    'libs/js/plugins/angular-idle/angular-idle.js',
    'libs/js/plugins/number-picker/angular-number-picker.min.js',
    'libs/js/bootstrap.min.js',
    'libs/js/MD5.js',
    'libs/js/plugins/moment/moment.min.js',
    'libs/js/plugins/moment/moment-timezone.js',
    'libs/js/formataModeda.js',
    'libs/js/indexedDB/IndexedDBCtrl.js',
    'libs/js/indexedDB/usuarioDAO.js',
    'libs/js/indexedDB/categoriaDAO.js',
    'libs/js/indexedDB/contaDAO.js',
    'libs/js/app.js',
    'libs/js/config.js',
    // directives
    'libs/js/directives/directives.js',
    // services
    'libs/js/services/authenticationAPI.js',
    'libs/js/services/genericAPI.js',
    // filters
    'libs/js/filters/filters.js',
    // images
    'libs/img/splash.gif',
    'libs/img/moneyrain.gif',
    'libs/img/ajax_loader_blue.gif',
    'libs/img/financas.jpg',
    'libs/img/cronograma.png',
    'libs/img/despesa.png',
    'libs/img/recebimento.png',
    'libs/img/icons/moneybreak-128x128.png',
    'libs/img/icons/moneybreak-144x144.png',
    'libs/img/icons/moneybreak-152x152.png',
    'libs/img/icons/moneybreak-192x192.png',
    'libs/img/icons/moneybreak-256x256.png',
    'libs/img/icons/moneybreak-512x512.png',
    // views
    'views/login.html',
    'views/menupage.html',
    'views/nav.html',
    'views/cronograma.html',
    'views/contaapagar.html',
    'views/contaareceber.html',
    // controllers
    'libs/js/controllers/mainCtrl.js',
    'libs/js/controllers/cronogramaCtrl.js',
    'libs/js/controllers/loginCtrl.js',
    'libs/js/controllers/menupageCtrl.js',
    'libs/js/controllers/homeCtrl.js',
    'libs/js/controllers/contaCtrl.js'
];

self.addEventListener('install', (e) => {
    console.log( '[ServiceWorker] Installer' );
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