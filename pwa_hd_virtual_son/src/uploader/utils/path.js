import { foldersPath } from "../files_list/fire-base-get-data";

export default function () {
    let path = '/';
    
    foldersPath.forEach((item, key) => {
        if (key > 0) {
            path += item.id + '/';
        }
    });
}