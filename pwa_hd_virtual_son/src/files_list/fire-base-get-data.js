import { app } from '../firebase';
import getData from './update-data';

//neste arquivos vamos gerenciar os caminhos 

let foldersPath = [];

export default function (ref) {
    let pos = foldersPath.findIndex((e) => e.id == ref.id); // retorna a posição caso encontre
    if (pos == -1) {
        foldersPath.push(ref);
    }else{
        foldersPath = foldersPath.slice(0, pos + 1);
    }

    let firebase_ref = '';
    let breadcrumbs = '';

    for (let i in foldersPath) {
        firebase_ref += foldersPath[i].id + '/';
        breadcrumbs += ` / <a href="" data-type="folder-open" data-fid="${foldersPath[i].id}" data-title="${foldersPath[i].title}">${foldersPath[i].title}</a>`;
    }

    let database = app.database();
    let filesRef = database.ref(firebase_ref);
    filesRef.on('value', getData);

    document.querySelector('#path').innerHTML = breadcrumbs;
}