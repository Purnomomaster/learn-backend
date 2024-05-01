const fs = require('fs')
const csv = require('csv-parser')
const { Transform } = require('stream')

const yearMili = 365 * 24 * 3600 * 1000

function clean() {
    return new Transform({
        objectMode: true,
        transform(data, encoding, callback) {
            const [firstName, lastName] = data.name.split(' ')
            const age = Math.floor((new Date() - new Date(data.dob)) / yearMili)
            const cleaned = {
                firstName,
                lastName,
                age
            }
            callback(null, JSON.stringify(cleaned) + '\n');
        }
    })
}

fs.createReadStream('people.csv')
    .pipe(csv())
    .pipe(clean())
    .on('data', (data) => {
        console.log(JSON.stringify(data))
    })
    .pipe(fs.createWriteStream('people.ndjson'))