const Splash = {
    splash: null,
    create: function () {
        var div = document.createElement('div');
        div.classList = 'main-splash';
        div.id = 'splash';
        var img = document.createElement('img');
        img.src = 'libs/img/ajax_loader_blue.gif';
        img.id = 'splashcreen';
        div.appendChild(img);
        document.body.appendChild(div);
        splash = div;
    },
    show: function () {
        if (splash === null) console.console.error('Splash->show: Erro, a Splash Screen não foi criada!');
        splash.classList += ' show';
    },
    close: function () {
        if (splash === null) console.console.error('Splash->show: Erro, a Splash Screen não foi criada!');
        setTimeout(() => {
            splash.classList = 'main-splash';
        }, 100);
    },
    init: function () {
        this.create();
    }
}