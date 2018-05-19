import getData from './fire-base-get-data';
import onClick from './on-click';
require('./style.scss');

export default {
    template: require('./template.html'),
    action() {
        getData({
            id: '/files/1',
            title: 'home'
        });
        onClick();
    }
}