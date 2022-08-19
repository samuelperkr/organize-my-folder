import fs from 'node:fs';
import { join, dirname, basename } from 'path';

export default function move(array, folderToMove) {
    for(let i = 0; i < array.length; i++) {
        let oldPath = array[i];
        let newPath = join(dirname(oldPath), folderToMove, basename(oldPath));
        
        fs.rename(oldPath, newPath, (err) => {
            if (err) throw err
            console.log("Sucessfully moved!");
        })
    }
}
