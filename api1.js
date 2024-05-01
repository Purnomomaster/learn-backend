const fs = require('fs').promises
const path = require('path')
async function getProducts(req, res, next) {
    const { id } = req.params
    let data = await fs.readFile(path.join(__dirname, 'products.json'))
    let products = JSON.parse(data).products
    let product = products.find(product => product.id === parseInt(id));
    if (!product) return next()
    res.json(product)
}
async function listProducts(req, res) {
    const { offset = 0, limit = 25, category } = req.query
    const data = await fs.readFile(path.join(__dirname, 'products.json'))
    let products = JSON.parse(data).products
    products = products.slice(offset, offset + limit);
    if (category) {
        products = products.filter(product => product.category && product.category.includes(category));
    }
    res.json(products)
}
async function createProduct(req, res) {
    console.log('request body', req.body)
    res.json(req.body)
}
async function editProduct(req, res) {
    res.json(req.body)
}
async function deleteProduct(req, res) {
    res.json({ success: true })
}
module.exports = {
    getProducts,
    listProducts,
    createProduct,
    editProduct,
    deleteProduct
}