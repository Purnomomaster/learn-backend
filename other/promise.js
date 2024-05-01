const fs = require('fs').promises
// fs.readdir('./')
//     .then(fileList =>
//         Promise.all(fileList.map(file => fs.readFile(file).then(data => [file, data.lenght]))
//         ))
//     .then(results => {
//         results.forEach(([file, length]) => console.log(`${file}:${length}`))
//         console.log(`done!`)
//     })
//     .catch(err => console.error(err))
// usage
const targetDir = process.argv[2] || './'
getFileLengths(targetDir)
    .then(results => {
        results.forEach(([file, length]) => console.log(`${file}:${length}`))
        console.log(`done!`)
    })
    .catch(err => console.error(err))
// add path and create function, import readFile
const path = require('path')

function readFile(filePath) {
    return fs
        .readFile(filePath)
        .then(data => [filePath, data.length])
        .catch(err => {
            if (err.code === 'EISDIR') return [filePath, 0]
            throw err
        })
}

function getFileLengths(dir) {
    return fs.readdir(dir).then(fileList => {
        const readFiles = fileList.map(file => {
            const filePath = path.join(dir, file)
            return readFile(filePath)
        })
        return Promise.all(readFiles)
    })
}