require('./style.scss');

class init {
    constructor(name) {
        let partil = require('./partial.html');
        let app = document.getElementById('app');
        app.innerHTML = partil;
    }
}

new init('Adelson');