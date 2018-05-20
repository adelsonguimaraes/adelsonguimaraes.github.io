import { app } from '../firebase';

export default function () {
    let fileInpunt = document.getElementById('file');
    fileInpunt.click();
    fileInpunt.addEventListener('change', function (e) {
        if(e.target.files.lenght <= 0) return false; 
        const storageRef = app.storage().ref();
        let fileRef = storageRef.child('files/1/' + e.target.files[0].name);
        fileRef.put(e.target.files[0]).then((snapshot) => {
            console.log(snapshot);
        });
    });
}