const MyMenu = {
    my: null,
    active: null,
    autoInit: true,
    clicked: false,
    create: function () {
        var body = document.body; // gettando body
        var div = document.createElement('div'); // criando div
        div.id = 'mymenu';
        // div.setAttribute('onclick', 'MyMenu.close(this)');
        var close = document.createElement('a');
        close.classList = 'close';
        close.innerHTML = '<i class="fa fa-times"></i>';
        div.classList = 'mymenu';
        // div.appendChild(close);
        var box = document.createElement('div'); // box
        box.classList = 'box';
        var divHeader = document.createElement('div'); // header
        divHeader.classList = 'header';
        var user = document.createElement('div');
        user.classList = 'user';
        var img = document.createElement('img');
        img.src = './libs/img/icons/icon-512x512.png';
        user.appendChild(img);
        divHeader.appendChild(user);
        var name = document.createElement('a');
        name.innerHTML = 'Sistema Solverp';
        name.id = 'menu-name';
        divHeader.appendChild(name);
        box.appendChild(divHeader);
        var ul = document.createElement('ul'); // criando ul
        var str =   '<li><a class="active" href="#/tarefas" onClick="MyMenu.clickMenuitem(this)"><i class="fa fa-wrench"></i> Minhas Tarefas</a></li>'+
                    '<li><a href="#/calendario" onClick="MyMenu.clickMenuitem(this)"><i class="fa fa-calendar"></i> Calendário</a></li>'+
                    '<li><a href="#/gestaotarefas" onClick="MyMenu.clickMenuitem(this)"><i class="fa fa-wrench"></i> Gestão Tarefas</a></li>'+
                    '';
        ul.innerHTML = str;
        box.appendChild(ul);
        // verificando se o acesso é via web ou solverp
        if (window === window.top) {
            var footer = document.createElement('div');
            footer.classList.add('footer');
            // footer.innerHTML = '<span class="version"> v' +version + '</span><a ng-click="logout()"><i class="fa fa-power-off"></i> Deslogar</a>';
            box.appendChild(footer);
        }
        
        div.appendChild(box);
        body.appendChild(div);
        this.my = div;
    },
    setFooter: function (html) {
        if (window === window.top) {
            setTimeout(() => {
                var footer = document.querySelector('#mymenu .footer');
                footer.innerHTML = html;
            }, 1000);
        }
    },
    setMenuItens: function (itens) {
        var ul = this.my.querySelector('ul');

        var menus = '';
        for (var i in itens) {
            var item = itens[i];
            menus += '<li><a href="#/'+item.url+'" onclick="MyMenu.clickMenuitem(this)"><i class="'+item.icon+'"></i> '+item.nome+'</a></li>'
        }

        ul.innerHTML = menus;
        setTimeout(() => {MyMenu.setActiveItemMenu();}, 500); // setando o intem ativo
    },
    setNameinMenu: function (name) {
        setTimeout(() => {
            var menuName = document.querySelector('#menu-name');
            menuName.innerHTML = name;
        }, 1000);
    },
    open: function () {
        this.my.classList += ' mymenu-show';
        document.body.style.overflow = 'hidden';
    },
    close: function () {
        MyMenu.my.classList = 'mymenu';
        document.body.style.overflow = 'auto'; // travando o scroll
    },
    autoclose: function () {
        this.my.addEventListener('click', function (e) {
            if (e.target.id === 'mymenu') {
                MyMenu.close();
            }
        });
    },
    clickMenuitem: function (e) {
        if (!MyMenu.clicked) {
            MyMenu.clicked = true;
            if (e === null) return false;
            var list = this.my.querySelectorAll('.active');
            for(var i in list) {
                if (typeof(list[i])) {
                    list[i].classList = '';
                }
            }
            e.classList.add('active');
            MyMenu.my.classList = 'mymenu';
            document.body.style.overflow = 'auto'; // travando o scroll
            setTimeout(() => { MyMenu.clicked = false }, 500);
        }
    },
    setActiveItemMenu: function () {
        var regex = /#\/[\w.]+/;
        var alias = window.location.hash.match(regex);
        alias = alias[0].substr(2);

        var item = document.querySelector('a[href="#/' + alias + '"]');
        MyMenu.clickMenuitem(item);
    },
    autoActiveMenu: function () {
        var regex = /#\/[\w.]+/;
        var alias = window.location.hash.match(regex);
        alias = alias[0].substr(2);

        var item = document.querySelector('a[href="#/'+alias+'"]');
        MyMenu.clickMenuitem(item);
        if ("onhashchange" in window) {
            window.addEventListener("hashchange", function (e) {
                var regex = /#\/[\w.]+/;
                var alias = window.location.hash.match(regex);
                alias = alias[0].substr(2);

                var item = document.querySelector('a[href="#/' + alias + '"]');
                MyMenu.clickMenuitem(item);
            });
        }
    },
    init: function () {
        this.create();
        this.autoclose();
        this.autoActiveMenu();
    }
}

// auto init
window.addEventListener('DOMContentLoaded', function () {
    if (MyMenu.autoInit) {
        MyMenu.init();
    }
});