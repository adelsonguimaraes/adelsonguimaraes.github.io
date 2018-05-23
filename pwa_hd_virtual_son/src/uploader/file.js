import { app } from '../firebase';
import { foldersPath } from '../files_list/fire-base-get-data';

export default function () {
    let path = '/';

    foldersPath.forEach((item, key) => {
        if (key > 0) {
            path += item.id + '/';
        }
    });

    let fileInpunt = document.getElementById('file');
    fileInpunt.click();
    fileInpunt.addEventListener('change', function (e) {
        if(e.target.files.lenght <= 0) return false; 
        const storageRef = app.storage().ref();
        let fileRef = storageRef.child('files/1' + path + e.target.files[0].name);
        fileRef.put(e.target.files[0]).then((snapshot) => {
            snapshot.ref.getDownloadURL().then(downloadUrl => {
                let folderRef = app.database().ref('files/1' + path);
                folderRef.push({
                    type: 'file', // tipo file
                    title: e.target.files[0].name, // titulo da imagem
                    url: downloadUrl // url de download
                });
            });
        });
    });
}