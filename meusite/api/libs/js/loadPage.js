const LoadPage = {
    routeDefault: null,
    script: null,
    addingRoutes: false,
    routes: [
        {
            "alias":"404",
            "html":"./app/views/common/404.html",
            "style":"404"
        }
    ],
    newRoute (alias, html, style, ctrl) {

        if ( alias === undefined && html === undefined) {
            console.error("[LoadPage:newRoute]: É necessário informar Alias e HTML para criar uma Rota");
            return false;
        }

        let myRoute  = {alias:'', html:'', style: '', controller:''};
        if (alias != undefined) myRoute.alias = alias;
        if (alias != undefined) myRoute.html = html;
        if (alias != undefined) myRoute.controller = ctrl;
        if (alias != undefined) myRoute.style = style;

        return myRoute;
    },
    // addRoute (alias, html, style, ctrl) {
    addRoute (route) {

        // if ( route.alias === undefined && route.html === undefined) {
        //     console.error("[LoadPage:AddRoute]: É necessário informar Alias e HTML para criar uma Rota");
        //     return false;
        // }

        // var myRoute  = {alias:'', html:'', style: '', controller:''};
        // if (route.alias != undefined) myRoute.alias = route.alias;
        // if (route.alias != undefined) myRoute.html = route.html;
        // if (route.alias != undefined) myRoute.controller = route.ctrl;
        // if (route.alias != undefined) myRoute.style = route.style;

        this.routes.push(route);
    },
    addRoutes (arrayRoutes) {
        addingRoutes = true;
        for (var i in arrayRoutes) {
            this.addRoute(arrayRoutes[i]);
        };
        addingRoutes = false;
    },
    loadFile (page) {
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
    },
    // função para carregamento de páginas HTML em uma div
    loadHtml (page, hash) {
        return new Promise (resolve => {
            // getando nosso elemento main criado no body do index
            var main = document.querySelector('main');
            
            this.loadFile(page).then(response => {
                if (response.success) {
                    main.innerHTML = response.data; // seta o conteúdo da main
                    document.location.hash = `/${hash}`; //atualiza o hash da página
                    resolve(true);
                }else{
                    resolve(false);
                }
            })
        });
    },
    loadController (ctrl) {
        return new Promise (resolve => {
            url = `./app/controllers/${ctrl}.js`;

            this.loadFile(url).then(response => {
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

    },
    loadStyle(style) {
        return new Promise (resolve => {
            url = `./app/css/${style}.css`;

            this.loadFile(url).then(response => {
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
    },
    // seta a rota padrão
    setRouteDefault (alias) {
        this.routeDefault = this.getRoute(alias);
    },
    getRoute (hash) {
        console.log(hash);
        let route = this.routeDefault;
        for (var i in this.routes) {
            if ( hash === this.routes[i].alias ) {
                route = this.routes[i];
            }
        }
        return route;
    },
    getHashPage () {
        let hash = document.location.hash; // getando o HASH passado pelo usuario
        let p = hash.indexOf('#/'); // verificando se o padrão hash está correto
        // escrevendo o hash
        this.goPage(hash.substr(p+2));
        
    },
    // função que recebe o ALIAS de uma ROTA e trata, lançando o usuário para a rota caso exista ou para o default caso não
    goPage(alias) {
        // escrevendo o hash
        let route = this.getRoute(alias);

        // carregamos o style caso exista
        if (route.style != undefined) {  // adiciona um css caso exista
            this.loadStyle(route.style).then(response => {
                this.loadHtml(route.html, route.alias).then(response => {
                    // controller caso exista
                     if (route.controller != undefined) {this.loadController(route.controller).then(response => {})};
                });
            });
        // caso não, passamos para o html
        }else{
            this.loadHtml(route.html, route.alias).then(response => {
                // controller caso exista
                if (route.controller != undefined) {this.loadController(route.controller).then(response => {})};
            });
        }
        
    }
}


// setando a rota padrão, qualquer tentativa de acesso a uma roa inexistente, é imediatamente devovle para a rota padrão
LoadPage.setRouteDefault('404');
// getando a primeira vez que o usuário abre o site
LoadPage.getHashPage();

// escutando o evento de alteração no hash (o HASH é o final do link do navegador, que é a nossa rota, quando ela for alterada manualmente getamos aqui nesse eventos)
if ("onhashchange" in window) {
    window.addEventListener("hashchange", function (e) {
        while (LoadPage.addingRoutes) { 
            LoadPage.getHashPage();
        }
    });
}