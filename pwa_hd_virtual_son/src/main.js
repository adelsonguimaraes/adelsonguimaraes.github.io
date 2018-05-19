import templateComponent from './template';
import files_list from './files_list/';

class init {
    constructor() {
        let elementApp = document.getElementById('app');
        elementApp.innerHTML = templateComponent.template;
        templateComponent.action();

        let elementBlock = document.getElementById('main');
        elementBlock.innerHTML = files_list.template;
        files_list.action();
    }
}

new init();