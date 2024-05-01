const fs = require('fs').promises
printLengths('./')

// async function printLength(file) {
//     try {
//         const data = await fs.readFile(file)
//         console.log(`${file}:${length}`)
//     } catch (err) {
//         console.error(err)
//     }
// }
// async function printLength(dir) {
//     const fileList = await fs.readdir(dir)
//     const results = await Promise.all(fileList.map(
//         async file => await fs.readFile(file).then(data => [file, data.length])
//     ))
//     results.forEach(result => console.log(`${result[0]}:${result[1]}`))
//     console.log(`done!`)
// }
async function printLengths(dir) {
    try {
        const results = await getFileLengths(dir)
        results.forEach(([file, length]) => console.log(`${file}:${length}`))
        console.log(`done!`)
    } catch (err) {
        console.error(err)
    }
}
const path = require('path')
async function readFile(filePath) {
    try {
        const data = await fs.readFile(filePath)
        return [filePath, data.length]
    } catch (err) {
        if (err.code === 'EISDIR') return [filePath, 0]
        throw err
    }
}

async function getFileLengths(dir) {
    const fileList = await fs.readdir(dir)
    const readFiles = fileList.map(async file => {
        const filePath = path.join(dir, file)
        return await readFile(filePath)
    })
    return await Promise.all(readFiles)
}