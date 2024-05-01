function mapAsync(arr, fn, onFinish) {
    let prevError
    let nRemaining = arr.length
    const result = []
    arr.forEach(function (item, i) {
        fn(item, function (err, data) {
            if (prevError) return
            if (err) {
                prevError = err
                return onFinish(err)
            }
            result[i] = data
            nRemaining--
            if (!nRemaining) onFinish(null, result)
        })
    })
}

// usage
const fs = require('fs')
// fs.readdir('./', function (err, files) {
//     if (err) return console.error(err)
//     mapAsync(files, fs.readFile, (err, results) => {
//         if (err) return console.error(err)
//         results.forEach((data, i) => console.log(`${files[i]}:${data.length}`))
//         console.log(`done!`)
//     })
// })
// create getFileLengths, function that can be used to get the length of each file in a directory
const path = require('path')
function getFileLengths(dir, cb) {
    fs.readdir(dir, function (err, files) {
        if (err) return cb(err)
        const filePaths = files.map(file => path.join(dir, file))
        mapAsync(filePaths, readFile, cb)
    })
}
const targetDir = process.argv[2] || './'
getFileLengths(targetDir, function (err, results) {
    if (err) return console.error(err)
    results.forEach(([file, length]) => console.log(`${file}:${length}`))
    console.log(`done!`)
})
// create custom readFile function that can be used to read a file and return its contents
function readFile(file, cb) {
    fs.readFile(file, function (err, fileData) {
        if (err) {
            if (err.code === 'EISDIR') return cb(null, [file, 0])
            return cb(err)
        }
        cb(null, [file, fileData.length])
    })
}
module.exports = { readFile }