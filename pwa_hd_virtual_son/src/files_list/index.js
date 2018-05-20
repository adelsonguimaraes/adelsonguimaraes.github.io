import getData from './fire-base-get-data';
import onClick from './on-click';
require('./style.scss');

export default {
    el: '#main',
    template: require('./template.html'),
    afterBind() {
        getData({
            id: '/files/1',
            title: 'home'
        });
        onClick();
    }
}