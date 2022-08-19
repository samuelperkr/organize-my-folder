import fs from 'node:fs';
import { fileURLToPath } from 'url';
import path from 'path';
import move from './move.js'

const downloadFolder = "/home/samuelperkr/Downloads";
const downloadFiles = getFiles(downloadFolder);
const objectFiles = checkExt(downloadFiles);

// function that returns an array with the files of
// the given folder path
function getFiles(folderPath) {

    // function that returns true for files and false for directories
    const isFile = fileName => {
        return fs.lstatSync(fileName).isFile();
    };   

    // files of the given folder path
    const files = fs.readdirSync(folderPath)
        .map(fileName => {
            return path.join(folderPath, fileName);
        })
        .filter(isFile);
    
    return files;
};

// check extensions and add it to an object of arrays
function checkExt(array) {

    // extensions to check
    const ext = {
        images: ["png", "jpg", "jpeg"],
        deb_exe: ["deb", "exe", "appimage", "tar.xz", "zip"],
        docs: ["pdf", "xlsx", "txt"],
        others: ["flatpakref", "whatever"]
    };

    // object which will be stored files by its type
    const files = {
        images: [],
        deb_exe: [],
        docs: [],
        others: [],
    }

    
    // check extensions of archives in array 
    for(let props in ext) {
        const propsArr = ext[props];

        
        // iterate on the array passed to function
        for(let i = 0; i < array.length; i++) {
            
            for(let props in ext) {
                let propsArr = ext[props];

                // iterate on extensions array nested in the first loop
                for(let j = 0; j < propsArr.length; j++) {
                    // const regex = new RegExp(`/$^${propsArr[j]}/`, 'i');

                    // if image extension add file to the end of array images
                    if(props === "images") {
                        const isImage = array[i].slice(-propsArr[j].length).toLowerCase() === propsArr[j];

                        if(isImage) {
                            files.images.push(array[i]);
                        }
                    }
                    
                    // if executable or compressed file extension add file to the end of array deb_exe
                    if(props === "deb_exe") {
                        const isDebExe = array[i].slice(-propsArr[j].length).toLowerCase() === propsArr[j];

                        if(isDebExe) {
                            files.deb_exe.push(array[i]);
                        }
                    }
                    
                    // if docs extension add file to the end of array docs
                    if(props === "docs") {
                        const isDocs = array[i].slice(-propsArr[j].length).toLowerCase() === propsArr[j];

                        if(isDocs) {
                            files.docs.push(array[i]);
                        }
                    }

                    // if other types of extensions add file to the end of array other
                    if(props === "others") {
                        const isOthers = array[i].slice(-propsArr[j].length).toLowerCase() === propsArr[j];

                        if(isOthers) {
                            files.others.push(array[i]);
                        }
                    }


                }
            }
        }
        // break the loop because it adds the same files 3 times without it
        break;
    }

    // return the object with the files separated by type
    return files;
};


// move files to respective folders
function moveFiles(files) {
    const { images, deb_exe, docs, others } = files;
    
    // move image files to imagens folder
    move(images, "imagens");

    // move executable or compressed files to deb-exe folder
    move(deb_exe, "deb-exe");

    // move docs files to docs folder
    move(docs, "docs");

    // move other types of files to other folder
    move(others, "others")
    
    return;
}

moveFiles(objectFiles);
