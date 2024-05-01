
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const api = require('./api1.js')
const middle = require('./middle1.js')

const app = express()
app.use(cors())
app.use(bodyParser.json())
const port = 3000
// console.log(__dirname)
app.get('/products', api.listProducts)
app.get('/products/:id', api.getProducts)
app.post('/products', api.createProduct)
app.put('/products/:id', api.editProduct)
app.delete('/products/:id', api.deleteProduct)

// test global object
// console.log(__filename)
app.use(middle.handleError)
app.use(middle.notFound)

app.listen(port, () => console.log(`server listening on http://localhost:${port}/products`))