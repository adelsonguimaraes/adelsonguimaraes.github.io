const LoadPage = {
    routeDefault: null,
    script: null,
    addingRoutes: false,
    start: false,
    location: false,
    activeHash: null,
    htmls: [],
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
            this.error('LoadPage->newRoute: É necessário informar Alias e HTML para criar uma Rota.');
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
    addScripts (srcs) {
        return new Promise (resolve => {
            for (var i in srcs) {
                var src = srcs[i];
                var scripts = document.scripts;
                var exist = false;
                for (var s in scripts) {
                    var script = scripts[s];
                    if (script.src !== undefined && script.src.indexOf(src.substr(src.lastIndexOf('/') + 1))>=0) exist = true;
                }
                if (!exist) {
                    var el = document.createElement('script');
                    el.src = src;
                    document.body.appendChild(el);
                    setTimeout(() => {resolve()}, 1000);
                }else{
                    resolve();
                }
            }
        });
    },
    loading () {
        var div = document.createElement('div');
        div.id = "loadpage-loading";
        div.style = 'width:100%;'+
        'text-align:center;'+
        // 'overflow:hidden;' +
        'background:#fff;'+
        'position: fixed;'+
        'height: 100vh;'+
        'top:0;'+
        'left:0;'+
        'z-index:99999;';
        // 'margin-top:50px;';
        var img = document.createElement('img');
        // img.src = 'libs/img/load-render.gif';
        img.src = 'libs/img/load-render.gif';
        img.style = (window.innerWidth < 540) ? 'width:100%;margin-top:60px;' : 'width:50%;margin-top:60px;';
        div.appendChild(img);
        var a = document.createElement('a');
        a.innerHTML = 'Renderizando..';
        a.style = 'color:black;' +
        'font-size:18px;' +
        'display:block;' +
        'text-decoration:none;' +
        'color: #00000094;' +
        'font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande", "Lucida Sans", Arial, sans-serif;';
        div.appendChild(a);
        document.body.appendChild(div);
    },
    showLoading () {
        var load = document.querySelector('#loadpage-loading');
        load.style.display = 'block';
    },
    closeLoading () {
        setTimeout(() => {
            var load = document.querySelector('#loadpage-loading');
            load.style.display = 'none';
        }, 500);
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
                    // alert(`"${page}" Não foi encontrado, verifique se o arquivo existe!`);
                    // resolve(response);
                    this.error('LoadPage->loadFile, ' + page + ' Não foi encontrado, verifique se o arquivo existe!');
                    return false;
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
                    document.location.hash = '#/'+ hash; //atualiza o hash da página
                    // window.location = '#/' + hash; //atualiza o hash da página
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
                    var count = 0;
                    var scripts = document.scripts;
                    for (var i in scripts) {
                        if (scripts[i].src != undefined && scripts[i].src.indexOf(ctrl)>=0) {
                            count++;
                            // scripts[i].parentElement.removeChild(scripts[i]);
                            // se o script já estiver em cache removemos
                            // document.scripts[i].remove();
                        }
                    }
                    if (count === 0) {
                        script = document.createElement('script');
                        script.src = url;
                        document.body.appendChild(script);
                    }
                    setTimeout(() => {
                        // caso o metodo init tenha sido criado
                        if (eval(ctrl + '.init') === undefined) {
                            this.error('LoadPage->loadController: ' + ctrl + ' Não possui um metodo init();');
                            return false;
                        }
                        // chamando o metodo init da controller
                        eval(ctrl+'.init()');
                    }, 1000);
                    
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
    error (error) {
        var body = document.body;
        body.innerHTML = '<div class="alert alert-danger" style="text-align:center;"><b> Ocorreu um erro<br>' + error + '</b></div>';
    },
    // seta a rota padrão
    setRouteDefault (alias) {
        this.routeDefault = this.getRoute(alias);
    },
    getRoute (hash) {
        let route = this.routeDefault;
        for (var i in this.routes) {
            if ( hash === this.routes[i].alias ) {
                route = this.routes[i];
            }
        }
        return route;
    },
    getHashPage () {
        if (this.start) return false;

        let hash = document.location.hash; // getando o HASH passado pelo usuario
        var regex = /#\/[\w.]+/;
        
        // let p = hash.indexOf('#/'); // verificando se o padrão hash está correto
        var alias = hash.match(regex);
        if (alias !== null) {
            var params = hash.replace(regex, '');
            alias = alias[0].substr(2);
        }
        
        // veirificamos se hash é exatamente o mesmo locado atual, se sim, bloqueamos o request
        if (alias === this.activeHash) {
            document.location.hash = '/' + this.activeHash + params; //atualiza o hash da página
            return false; 
        }

        this.start = true;
        this.goPage(alias, params);
        
    },
    // função que recebe o ALIAS de uma ROTA e trata, lançando o usuário para a rota caso exista ou para o default caso não
    goPage(alias, params) {
        // escrevendo o hash
        let route = this.getRoute(alias);
        this.activeHash = alias;

        var main = document.querySelector('main');
        main.style.display = 'none';
        // LoadPage.showLoading(); // apresenta loading

        // carregamos o style caso exista
        if (route.style != undefined) {  // adiciona um css caso exista
            this.loadStyle(route.style).then(response => {
                this.loadHtml(route.html, route.alias).then(response => {
                    // controller caso exista
                     if (route.controller != undefined) {this.loadController(route.controller).then(response => {
                        this.start = false;
                        if (!this.location) main.style.display = 'block';
                        LoadPage.closeLoading(); // esconde loading
                     })}else{
                        LoadPage.closeLoading(); // esconde loading
                     };
                });
            });
        // caso não, passamos para o html
        }else{
            this.loadHtml(route.html, route.alias).then(response => {
                // controller caso exista
                if (route.controller != undefined) {this.loadController(route.controller).then(response => {
                    this.start = false;
                    if (!this.location) main.style.display = 'block';
                    LoadPage.closeLoading(); // esconde loading
                })}else{
                    LoadPage.closeLoading(); // esconde loading
                };
            });
        }
        
    },

    setLocation(alias) {
        window.location = '#/' + alias;
    },

    init() {
        LoadPage.loading();
        // getando a primeira vez que o usuário abre o site
        LoadPage.getHashPage();

        // escutando o evento de alteração no hash (o HASH é o final do link do navegador, que é a nossa rota, quando ela for alterada manualmente getamos aqui nesse eventos)
        if ("onhashchange" in window) {
            window.addEventListener("hashchange", function (e) {
                if (!LoadPage.addingRoutes) { 
                    // setTimeout(() => {
                        LoadPage.getHashPage();
                    // }, 100);
                }
            });
        }


        var atention = document.createElement('div');
        atention.style.right = '-56px';
        atention.style.margin = '0';
        atention.style.position = 'fixed';
        atention.style.transform = 'rotate(270deg)';
        atention.style.zIndex = 1000;
        atention.style.top = '300px';
        atention.style.background = '#bb1d1d';
        atention.style.color = '#fff';
        atention.style.fontWeight = 'bold';
        atention.style.padding = '5px';
        atention.style.display = 'none';
        document.body.appendChild(atention);

        window.addEventListener('offline', function (e) {
            atention.style.display = 'block';
            atention.innerHTML = '<i class="fa fa-signal"></i> Conexão Perdida';
            MyToast.show('<i class="fa fa-signal"></i> Você está Off-Line', 5);
        });
        window.addEventListener('online', function (e) {
            atention.style.display = 'none';
            atention.innerHTML = '<i class="fa fa-signal"></i> Conexão Reestabelecida';
            MyToast.show('<i class="fa fa-signal"></i> Conexão reestabelecida', 5);
        });
    }
}


// setando a rota padrão, qualquer tentativa de acesso a uma roa inexistente, é imediatamente devovle para a rota padrão
LoadPage.setRouteDefault('404');
