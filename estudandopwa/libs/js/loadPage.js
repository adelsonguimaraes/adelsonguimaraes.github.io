let routeDefault = '#/404';
let script = null;
let routes = [
    {
        "alias":"404",
        "html":"./app/views/common/404.html",
        "style":"404"
    },
    {
        "alias": "home",
        "html": "./app/views/home.html",
        "controller": "homeCtrl",
        "style": "home"
    },
    {
        "alias": "geolocation",
        "html": "./app/views/geolocation.html",
        "controller": "geolocationCtrl",
        "style": "geolocation"
    }
];

// função para carregamento de páginas HTML em uma div
function load (page) {
    // getando nosso elemento main criado no body do index
    var main = document.querySelector('main');
    
    var xhr = new XMLHttpRequest();

    xhr.onload = function () {
        main.innerHTML = this.response;
    };

    xhr.open('GET', page, true);
    xhr.send();
}

function loadController (ctrl) {
    url = `./app/controllers/${ctrl}.js`;
    var scripts = document.scripts;
    for (var i in scripts) {
        if (scripts[i].src != undefined && scripts[i].src.indexOf(ctrl)>=0) {
            // se o script já estiver em cache removemos
            document.scripts[i].remove();
        }
    }
    script = document.createElement('script');
    script.src = url;
    document.body.appendChild(script);
}

function loadStyle(style) {
    var links = document.querySelectorAll('link');
    var count = 0;
    for (var i in links) {
        // console.log(links[i].href);
        // console.log(style);
        if (links[i].href != undefined && links[i].href.indexOf(style) >= 0) {
            count++;
        }
    }
    // caso script ainda não tenha sido adicionado
    if (count === 0) {
        url = `./app/css/${style}.css`;
        let link = document.createElement('link');
        link.rel = `stylesheet`;
        link.href = url;
        document.head.appendChild(link);
    }
}

// seta a rota padrão
function setRouteDefault (alias) {
    routeDefault = getRoute(alias);
};

function getRoute (hash) {
    let route = routeDefault;
    for (var i in routes) {
        if ( hash === routes[i].alias ) {
            route = routes[i];
        }
    }
    return route;
}

function getHashPage () {
    let hash = document.location.hash; // getando o HASH passado pelo usuario
    let p = hash.indexOf('#/'); // verificando se o padrão hash está correto
   
    // escrevendo o hash
    var route = getRoute(hash.substr(p+2));
    load(route.html); // carregando a rota
    document.location.hash = `/${route.alias}`; // atualizamos o hash
    if (route.controller != undefined) loadController(route.controller); // adiciona um controller caso exista
    if (route.style != undefined) loadStyle(route.style); // adiciona um css caso exista
}

function goPage(alias) {
    // escrevendo o hash
    var route = getRoute(alias);
    load(route.html); // carregando a rota
    document.location.hash = `/${route.alias}`; // atualizamos o hash
    if (route.controller != undefined) loadController(route.controller); // adiciona um controller caso exista
    if (route.style != undefined) loadStyle(route.style); // adiciona um css caso exista
}


setRouteDefault('404');
getHashPage();

// escutando o evento de alteração no hash
if ("onhashchange" in window) {
    window.addEventListener("hashchange", function (e) {
        getHashPage();
    });
}