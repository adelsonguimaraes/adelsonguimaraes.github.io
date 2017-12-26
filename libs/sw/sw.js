self.addEventListener('install', function (event) {
    console.log('install');
});
self.addEventListener('activate', function (event) {
    console.log('activate');
});
self.addEventListener('fetch', function (event) {
    console.log('estamos aqui');
    if ( event.request.url.includes('index.html')) {
        var responseContent = '<html><body><div>Hello Nuvio</div></body></html>';

        event.responseWith(
            new Response(reponseContent, {
                headers: {
                    'Content-Type' : 'text/html'
                }
            })
        )
    }
});