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
    },
    {
        "alias": "notification",
        "html": "./app/views/notification.html",
        "controller": "notificationCtrl",
        "style": "notification"
    },
    {
        "alias": "testeinternet",
        "html": "./app/views/testeinternet.html",
        "controller": "testeinternetCtrl",
        "style": "testeinternet"
    }
];

function addRoute (alias, html, style, ctrl) {

    if ( alias === undefined && html === undefined) {
        console.error("[LoadPage:AddRoute]: É necessário informar Alias e HTML para criar uma Rota");
        return false;
    }

    var myRoute  = {alias:'', html:'', style: '', controller:''};
    if (alias != undefined) myRoute.alias = alias;
    if (alias != undefined) myRoute.html = html;
    if (alias != undefined) myRoute.controller = ctrl;
    if (alias != undefined) myRoute.style = style;

    routes.push(myRoute);
}

function loadFile (page) {
    return new Promise (resolve => {
        var xhr = new XMLHttpRequest();

        var response = {
            "succcess" : false,
            "data" : null
        };

        // xhr.onload = function () {
            // if (this.status === 200) {
            //     main.innerHTML = this.response;
            //     resolve(true);
            // }else{

            //     reject(false);
            // }
        // };

        xhr.onloadend = function() {
             if (this.status === 200) {
                response.success = true;
                response.data = this.response;
                resolve(response);
            }else{
                alert(`"${page}" Não foi encontrado, verifique se o arquivo existe!`);
                resolve(response);
            }
        }

        xhr.open('GET', page, true);
        xhr.send();
    });
}

// função para carregamento de páginas HTML em uma div
function loadPage (page, hash) {
    return new Promise (resolve => {
        // getando nosso elemento main criado no body do index
        var main = document.querySelector('main');
        
        loadFile(page).then(response => {
            if (response.success) {
                main.innerHTML = response.data; // seta o conteúdo da main
                document.location.hash = `/${hash}`; //atualiza o hash da página
                resolve(true);
            }else{
                resolve(false);
            }
        })
    });
}

function loadController (ctrl) {
    return new Promise (resolve => {
        url = `./app/controllers/${ctrl}.js`;

        loadFile(url).then(response => {
            if (response.success) {
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
                resolve(true);
            }else{
                resolve(false);
            }
        })
    });

}

function loadStyle(style) {
    return new Promise (resolve => {
        url = `./app/css/${style}.css`;

        loadFile(url).then(response => {
            if (response.success) {
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
                    let link = document.createElement('link');
                    link.rel = `stylesheet`;
                    link.href = url;
                    document.head.appendChild(link);
                }
                resolve(true);
            }else{
                resolve(false);
            }
        })
    });
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
    goPage(hash.substr(p+2));
    
}

// função que recebe o ALIAS de uma ROTA e trata, lançando o usuário para a rota caso exista ou para o default caso não
function goPage(alias) {
    // escrevendo o hash
    var route = getRoute(alias);
    // carregamos o style caso exista
    if (route.style != undefined) {  // adiciona um css caso exista
        loadStyle(route.style).then(response => {
            loadPage(route.html, route.alias).then(response => {
                // controller caso exista
                 if (route.controller != undefined) {loadController(route.controller).then(response => {})};
            });
        });
    // caso não, passamos para o html
    }else{
        loadPage(route.html, route.alias).then(response => {
            // controller caso exista
            if (route.controller != undefined) {loadController(route.controller).then(response => {})};
        });
    }
    
}


// setando a rota padrão, qualquer tentativa de acesso a uma roa inexistente, é imediatamente devovle para a rota padrão
setRouteDefault('home');
// getando a primeira vez que o usuário abre o site
getHashPage();

// escutando o evento de alteração no hash (o HASH é o final do link do navegador, que é a nossa rota, quando ela for alterada manualmente getamos aqui nesse eventos)
if ("onhashchange" in window) {
    window.addEventListener("hashchange", function (e) {
        getHashPage();
    });
}