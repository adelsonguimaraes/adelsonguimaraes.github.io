export default function (snapshot) {
    let files = snapshot.val();
    files = Object.entries(files);

    let partial = require('./partial.html');
    let html = '';

    // organiza por nome
    files.sort((a, b) =>  {
        if (typeof a[1] != 'object') {
            return false; // finaliza o item em loop atual e passa para o próximo
        }
        return a[1].title.localeCompare(b[1].title);
    });

    // pastas primeiro
    files.sort((a, b) =>  {
        if (typeof a[1] != 'object') {
            return false; // finaliza o item em loop atual e passa para o próximo
        }
        return a[1].type < b[1].type;
    });

    for (let f in files) {
        if (typeof files[f][1] != 'object') {
            continue; // finaliza o item em loop atual e passa para o próximo
        }
        html += partial
            .replace(/{{ fid }}/g, files[f][0])
            .replace(/{{ title }}/g, files[f][1].title)
            .replace(/{{ type }}/g, files[f][1].type);
    }

    document.querySelector('#main .files').innerHTML = html;
}